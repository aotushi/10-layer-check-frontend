export type ApiJsonPrimitive = string | number | boolean | null
export type ApiJsonValue = ApiJsonPrimitive | ApiJsonValue[] | { [key: string]: ApiJsonValue }
export type ApiJsonRecord = Record<string, ApiJsonValue>
export type ApiHttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
export type ApiQueryPrimitive = string | number | boolean | null | undefined
export type ApiQueryValue = ApiQueryPrimitive | ApiQueryPrimitive[]
export type ApiQueryParams = Record<string, ApiQueryValue>

export type ApiRequestOptions = {
  method?: ApiHttpMethod
  body?: ApiJsonRecord
  query?: ApiQueryParams
  headers?: HeadersInit
  signal?: AbortSignal
}

export type ApiErrorPayload = {
  error?: string
  error_code?: string
  code?: string
  message?: string
}

export type UserProfile = {
  id: string
  email: string
}

export type AuthCredentials = {
  email: string
  password: string
}

export type AuthResponse = {
  ok: true
  user: UserProfile
  token: string
}

export type CurrentUserResponse = {
  ok: true
  user: UserProfile
}

export type ScanHistoryItem = {
  id: string
  user_id: string
  job_id: string
  target: string
  status: string
  created_at: string
  completed_at: string | null
}

export type UserHistoryResponse = {
  ok: true
  history: ScanHistoryItem[]
}

export type UserHistoryItemResponse = {
  ok: true
  item: ScanHistoryItem
}

export type ScanStrategy = 'mobile' | 'desktop'

export type SiteScanAsyncProvider =
  | 'browser_runtime'
  | 'live_tls'
  | 'lighthouse'
  | 'pagespeed'
  | 'webpagetest'

export type SiteScanSyncProbe =
  | 'dns_infrastructure'
  | 'tls_certificate'
  | 'subdomain_attack_surface'
  | 'service_fingerprint'
  | 'public_host_fingerprint'
  | 'public_security_details'
  | 'public_content_surface'
  | 'public_content_detail'
  | 'public_spa_metadata'
  | 'organization_intelligence'
  | 'api_reachability'
  | 'remote_fetch'
  | 'performance_basic'

export type CreateScanJobRequest = {
  target: string
  strategy?: ScanStrategy
  async_providers?: SiteScanAsyncProvider[]
  sync_probes?: SiteScanSyncProbe[]
  max_redirects?: number
  location?: string
}

export type ScanJobSummary = {
  id: string
  target: string
  normalized_target: string
  status?: string
  created_at?: string
  updated_at?: string
}

export type SiteScanJobEnvelope = {
  schema_version: string
  generated_at?: string
  job: ScanJobSummary
  raw_scan_start?: unknown
  persisted?: {
    meta_ref?: string
    raw_ref?: string
    artifact_ref?: string | null
    ttl_expires_at?: string
  }
}

export type PersistedScanJobResponse = {
  ok: boolean
  schema_version: string
  meta?: unknown
}

export type ScanArtifactResponse = ApiJsonRecord

export type AiReportResponse = ApiJsonRecord
