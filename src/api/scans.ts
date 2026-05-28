import { apiRequest } from './client'
import type {
  AiReportResponse,
  CreateScanJobRequest,
  PersistedScanJobResponse,
  ScanArtifactResponse,
  SiteScanJobEnvelope,
} from './types'

const DEFAULT_SCAN_REQUEST = {
  async_providers: [],
  strategy: 'mobile',
} satisfies Pick<CreateScanJobRequest, 'async_providers' | 'strategy'>

export function createScanJob(input: CreateScanJobRequest): Promise<SiteScanJobEnvelope> {
  return apiRequest<SiteScanJobEnvelope>('/scan/jobs', {
    method: 'POST',
    body: {
      ...DEFAULT_SCAN_REQUEST,
      ...input,
    },
  })
}

export function getScanJob(id: string, signal?: AbortSignal): Promise<PersistedScanJobResponse> {
  return apiRequest<PersistedScanJobResponse>(`/scan/jobs/${encodeURIComponent(id)}`, { signal })
}

export function getScanJobArtifact(
  id: string,
  signal?: AbortSignal,
): Promise<ScanArtifactResponse> {
  return apiRequest<ScanArtifactResponse>(`/scan/jobs/${encodeURIComponent(id)}/artifact`, {
    signal,
  })
}

export function createScanJobReport(id: string): Promise<AiReportResponse> {
  return apiRequest<AiReportResponse>(`/scan/jobs/${encodeURIComponent(id)}/report`, {
    method: 'POST',
    body: {},
  })
}
