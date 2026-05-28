import { apiRequest } from './client'
import type { UserHistoryItemResponse, UserHistoryResponse } from './types'

export function getUserHistory(
  input: {
    limit?: number
    signal?: AbortSignal
  } = {},
): Promise<UserHistoryResponse> {
  return apiRequest<UserHistoryResponse>('/user/history', {
    query: {
      limit: input.limit,
    },
    signal: input.signal,
  })
}

export function getUserHistoryItem(
  jobId: string,
  signal?: AbortSignal,
): Promise<UserHistoryItemResponse> {
  return apiRequest<UserHistoryItemResponse>(`/user/history/${encodeURIComponent(jobId)}`, {
    signal,
  })
}
