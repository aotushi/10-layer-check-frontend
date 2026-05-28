import { computed, readonly, shallowRef, watch, type MaybeRefOrGetter, toValue } from 'vue'

import { ApiRequestError } from '@/api/client'
import { getScanJob, getScanJobArtifact } from '@/api/scans'

export type LiveLayerSummary = {
  id: string
  label: string
  status: string
  count: number
}

export type LiveRiskSummary = {
  id: string
  title: string
  level: string
}

export type LiveMissingDataSummary = {
  id: string
  label: string
  category: string
}

export type LiveScanReport = {
  jobId: string
  target: string
  normalizedTarget: string
  status: string
  generatedAt: string
  recordCount: number
  storageState: string
  artifactRef: string
  executiveSummary: string
  layers: LiveLayerSummary[]
  risks: LiveRiskSummary[]
  missingData: LiveMissingDataSummary[]
}

export function useScanJobReport(jobId: MaybeRefOrGetter<string>) {
  const jobResponse = shallowRef<unknown>(null)
  const artifactResponse = shallowRef<unknown>(null)
  const isLoading = shallowRef(false)
  const errorMessage = shallowRef('')

  const report = computed(() =>
    createLiveScanReport(toValue(jobId), jobResponse.value, artifactResponse.value),
  )

  async function load(): Promise<void> {
    const id = toValue(jobId).trim()
    errorMessage.value = ''

    if (!id) {
      errorMessage.value = 'Report id is missing.'
      return
    }

    isLoading.value = true

    try {
      const [job, artifact] = await Promise.all([getScanJob(id), getScanJobArtifact(id)])
      jobResponse.value = job
      artifactResponse.value = artifact
    } catch (error) {
      errorMessage.value = toReportLoadMessage(error)
    } finally {
      isLoading.value = false
    }
  }

  watch(() => toValue(jobId), load, { immediate: true })

  return {
    errorMessage: readonly(errorMessage),
    isLoading: readonly(isLoading),
    load,
    report,
  }
}

function createLiveScanReport(
  jobId: string,
  jobResponse: unknown,
  artifactResponse: unknown,
): LiveScanReport {
  const meta = readRecord(readRecord(jobResponse, 'meta'), '') ?? readRecord(jobResponse, 'meta')
  const artifact = isRecord(artifactResponse) ? artifactResponse : {}
  const run = readRecord(artifact, 'run') ?? {}
  const brief = readRecord(artifact, 'brief') ?? {}
  const coverage = readRecord(brief, 'coverage') ?? {}
  const persisted = readRecord(artifact, 'persisted') ?? {}
  const target =
    readString(run, 'target') ??
    readString(meta, 'target') ??
    readString(brief, 'target') ??
    'Unknown target'
  const normalizedTarget =
    readString(run, 'normalized_target') ??
    readString(meta, 'normalized_target') ??
    readString(brief, 'normalized_target') ??
    target
  const records = readArray(artifact, 'records')
  const layers = createLayerSummaries(readArray(brief, 'layers'), coverage)
  const risks = createRiskSummaries(readArray(brief, 'risks'))
  const missingData = createMissingDataSummaries(readArray(brief, 'missing_data'))

  return {
    jobId,
    target,
    normalizedTarget,
    status: readString(meta, 'status') ?? 'unknown',
    generatedAt:
      readString(artifact, 'generated_at') ?? readString(meta, 'updated_at') ?? 'Not generated',
    recordCount: readNumber(run, 'record_count') ?? records.length,
    storageState: readString(persisted, 'artifact_ref')
      ? 'Persisted local artifact'
      : 'Generated artifact',
    artifactRef:
      readString(persisted, 'artifact_ref') ?? readString(meta, 'artifact_ref') ?? 'not persisted',
    executiveSummary: readString(brief, 'executive_summary') ?? 'Live scan artifact loaded.',
    layers,
    risks,
    missingData,
  }
}

function createLayerSummaries(
  layers: unknown[],
  coverage: Record<string, unknown>,
): LiveLayerSummary[] {
  if (layers.length > 0) {
    return layers.slice(0, 10).map((layer, index) => {
      const record = isRecord(layer) ? layer : {}
      const layerId =
        readString(record, 'id') ??
        readLayerId(readNumber(record, 'layer')) ??
        readString(record, 'layer') ??
        `L${index + 1}`
      const label = readString(record, 'name') ?? readString(record, 'title') ?? layerId
      const records = readArray(record, 'records')
      const evidenceRefs = readArray(record, 'evidence_refs')

      return {
        id: layerId,
        label,
        status: readString(record, 'status') ?? 'collected',
        count: readNumber(record, 'record_count') ?? (records.length || evidenceRefs.length),
      }
    })
  }

  const collectedLayers = readArray(coverage, 'collected_layers')
  return collectedLayers.slice(0, 10).map((layer) => {
    const layerNumber = typeof layer === 'number' ? layer : Number(layer)
    const safeLayer = Number.isFinite(layerNumber) ? layerNumber : 0

    return {
      id: `L${safeLayer}`,
      label: `Layer ${safeLayer}`,
      status: 'collected',
      count: 0,
    }
  })
}

function createRiskSummaries(risks: unknown[]): LiveRiskSummary[] {
  return risks.slice(0, 5).map((risk, index) => {
    const record = isRecord(risk) ? risk : {}

    return {
      id: readString(record, 'id') ?? `R${index + 1}`,
      title:
        readString(record, 'title') ??
        readString(record, 'summary') ??
        readString(record, 'item') ??
        'Risk signal requires review',
      level: readString(record, 'level') ?? readString(record, 'severity') ?? 'review',
    }
  })
}

function createMissingDataSummaries(items: unknown[]): LiveMissingDataSummary[] {
  return items.slice(0, 6).map((item, index) => {
    const record = isRecord(item) ? item : {}

    return {
      id: readString(record, 'id') ?? `M${index + 1}`,
      label:
        readString(record, 'label') ??
        readString(record, 'description') ??
        readString(record, 'item') ??
        readString(record, 'name') ??
        'Missing evidence',
      category: readString(record, 'category') ?? readString(record, 'classification') ?? 'unknown',
    }
  })
}

function toReportLoadMessage(error: unknown): string {
  if (error instanceof ApiRequestError) {
    if (error.status === 0) {
      return error.message
    }

    return `Report API returned ${error.status}: ${error.message}`
  }

  if (error instanceof TypeError) {
    return 'Cannot reach the local scan API. Start the Worker and reload this report.'
  }

  return error instanceof Error ? error.message : 'Report request failed.'
}

function readRecord(record: unknown, key: string): Record<string, unknown> | null {
  if (!key) {
    return isRecord(record) ? record : null
  }

  if (!isRecord(record)) {
    return null
  }

  const value = record[key]
  return isRecord(value) ? value : null
}

function readArray(record: Record<string, unknown>, key: string): unknown[] {
  const value = record[key]
  return Array.isArray(value) ? value : []
}

function readString(record: Record<string, unknown> | null, key: string): string | null {
  if (!record) {
    return null
  }

  const value = record[key]
  return typeof value === 'string' && value.trim() ? value : null
}

function readNumber(record: Record<string, unknown>, key: string): number | null {
  const value = record[key]
  return typeof value === 'number' && Number.isFinite(value) ? value : null
}

function readLayerId(value: number | null): string | null {
  return value === null ? null : `L${value}`
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}
