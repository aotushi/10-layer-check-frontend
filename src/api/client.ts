import type { ApiErrorPayload, ApiJsonRecord, ApiRequestOptions } from './types'

export class ApiRequestError extends Error {
  readonly status: number
  readonly payload: unknown

  constructor(message: string, status: number, payload: unknown) {
    super(message)
    this.name = 'ApiRequestError'
    this.status = status
    this.payload = payload
  }
}

export async function apiRequest<T>(path: string, options: ApiRequestOptions = {}): Promise<T> {
  const response = await fetch(createApiUrl(path), {
    method: options.method ?? 'GET',
    headers: createHeaders(Boolean(options.body)),
    body: options.body ? JSON.stringify(options.body) : undefined,
    signal: options.signal,
  })
  const payload = await readResponsePayload(response)

  if (!response.ok) {
    throw new ApiRequestError(readErrorMessage(payload, response.status), response.status, payload)
  }

  return payload as T
}

function createApiUrl(path: string): string {
  const baseUrl = import.meta.env.VITE_API_BASE_URL?.trim()

  if (!baseUrl) {
    throw new ApiRequestError('VITE_API_BASE_URL is not configured.', 0, null)
  }

  return new URL(path, baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`).toString()
}

function createHeaders(hasBody: boolean): Headers {
  const headers = new Headers()
  const apiKey = import.meta.env.VITE_PROBE_API_KEY?.trim()

  if (hasBody) {
    headers.set('content-type', 'application/json')
  }

  if (apiKey) {
    headers.set('x-api-key', apiKey)
  }

  return headers
}

async function readResponsePayload(response: Response): Promise<unknown> {
  const text = await response.text()

  if (!text) {
    return null
  }

  try {
    return JSON.parse(text) as ApiJsonRecord
  } catch {
    return text
  }
}

function readErrorMessage(payload: unknown, status: number): string {
  if (isApiErrorPayload(payload)) {
    return (
      payload.error ?? payload.message ?? payload.error_code ?? `API request failed (${status}).`
    )
  }

  if (typeof payload === 'string' && payload.trim()) {
    return payload
  }

  return `API request failed (${status}).`
}

function isApiErrorPayload(value: unknown): value is ApiErrorPayload {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}
