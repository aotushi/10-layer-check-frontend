import type {
  ApiErrorPayload,
  ApiHttpMethod,
  ApiJsonRecord,
  ApiQueryParams,
  ApiRequestOptions,
} from './types'
import { readAuthToken } from './auth-session'

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
  const method = options.method ?? 'GET'
  const body = createRequestBody(method, options.body)
  let response: Response

  try {
    response = await fetch(createApiUrl(path, options.query), {
      method,
      headers: createHeaders(Boolean(body), options.headers),
      body,
      signal: options.signal,
    })
  } catch (error) {
    if (isAbortError(error)) {
      throw error
    }

    throw new ApiRequestError(readNetworkErrorMessage(error), 0, error)
  }

  const payload = await readResponsePayload(response)

  if (!response.ok) {
    throw new ApiRequestError(readErrorMessage(payload, response.status), response.status, payload)
  }

  return payload as T
}

function createApiUrl(path: string, query?: ApiQueryParams): string {
  const baseUrl = import.meta.env.VITE_API_BASE_URL?.trim()

  if (!baseUrl) {
    throw new ApiRequestError('VITE_API_BASE_URL is not configured.', 0, null)
  }

  const normalizedPath = path.replace(/^\/+/, '')
  const url = new URL(normalizedPath, baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`)
  appendQueryParams(url.searchParams, query)

  return url.toString()
}

function createRequestBody(
  method: ApiHttpMethod,
  body: ApiJsonRecord | undefined,
): string | undefined {
  if (!body) {
    return undefined
  }

  if (method === 'GET') {
    throw new ApiRequestError('GET request cannot include a JSON body.', 0, null)
  }

  return JSON.stringify(body)
}

function createHeaders(hasBody: boolean, customHeaders?: HeadersInit): Headers {
  const headers = new Headers(customHeaders)
  const apiKey = import.meta.env.VITE_PROBE_API_KEY?.trim()

  if (!headers.has('accept')) {
    headers.set('accept', 'application/json')
  }

  if (hasBody && !headers.has('content-type')) {
    headers.set('content-type', 'application/json')
  }

  if (apiKey && !headers.has('x-api-key')) {
    headers.set('x-api-key', apiKey)
  }

  const token = readAuthToken()
  if (token && !headers.has('authorization')) {
    headers.set('authorization', `Bearer ${token}`)
  }

  return headers
}

function appendQueryParams(searchParams: URLSearchParams, query?: ApiQueryParams): void {
  if (!query) {
    return
  }

  for (const [key, value] of Object.entries(query)) {
    const values = Array.isArray(value) ? value : [value]

    for (const item of values) {
      if (item === null || item === undefined) {
        continue
      }

      searchParams.append(key, String(item))
    }
  }
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
      payload.error ??
      payload.message ??
      payload.error_code ??
      payload.code ??
      `API request failed (${status}).`
    )
  }

  if (typeof payload === 'string' && payload.trim()) {
    return payload
  }

  return `API request failed (${status}).`
}

function readNetworkErrorMessage(error: unknown): string {
  if (error instanceof Error && error.message.trim()) {
    return `Cannot reach the API: ${error.message}`
  }

  return 'Cannot reach the API.'
}

function isApiErrorPayload(value: unknown): value is ApiErrorPayload {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

function isAbortError(error: unknown): boolean {
  return error instanceof DOMException && error.name === 'AbortError'
}
