import { defineMutation, defineQuery, useMutation, useQuery } from '@pinia/colada'
import { shallowRef } from 'vue'

import { createScanJob, createScanJobReport, getScanJob, getScanJobArtifact } from '@/api/scans'
import type {
  AiReportResponse,
  CreateScanJobRequest,
  PersistedScanJobResponse,
  ScanArtifactResponse,
  SiteScanJobEnvelope,
} from '@/api/types'

const SCAN_JOB_STALE_MS = 15_000
const SCAN_ARTIFACT_STALE_MS = 15_000

export const useScanJobQuery = defineQuery(() => {
  const jobId = shallowRef('')

  const query = useQuery<PersistedScanJobResponse>({
    key: () => ['GET', '/scan/jobs/:id', jobId.value],
    query: ({ signal }) => getScanJob(jobId.value, signal),
    enabled: () => Boolean(jobId.value),
    staleTime: SCAN_JOB_STALE_MS,
  })

  function setJobId(value: string): void {
    jobId.value = value.trim()
  }

  return {
    ...query,
    jobId,
    setJobId,
  }
})

export const useScanJobArtifactQuery = defineQuery(() => {
  const jobId = shallowRef('')

  const query = useQuery<ScanArtifactResponse>({
    key: () => ['GET', '/scan/jobs/:id/artifact', jobId.value],
    query: ({ signal }) => getScanJobArtifact(jobId.value, signal),
    enabled: () => Boolean(jobId.value),
    staleTime: SCAN_ARTIFACT_STALE_MS,
  })

  function setJobId(value: string): void {
    jobId.value = value.trim()
  }

  return {
    ...query,
    jobId,
    setJobId,
  }
})

export const useCreateScanJobMutation = defineMutation(() =>
  useMutation<SiteScanJobEnvelope, CreateScanJobRequest>({
    key: ['POST', '/scan/jobs'],
    mutation: (input) => createScanJob(input),
  }),
)

export const useCreateScanJobReportMutation = defineMutation(() =>
  useMutation<AiReportResponse, string>({
    key: (jobId) => ['POST', '/scan/jobs/:id/report', jobId],
    mutation: (jobId) => createScanJobReport(jobId),
  }),
)
