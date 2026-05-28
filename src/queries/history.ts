import { defineQuery, useQuery } from '@pinia/colada'
import { shallowRef } from 'vue'

import { getUserHistory, getUserHistoryItem } from '@/api/history'
import type { UserHistoryItemResponse, UserHistoryResponse } from '@/api/types'
import { useAuthStore } from '@/stores/auth'

const HISTORY_STALE_MS = 15_000

export const useScanHistoryQuery = defineQuery(() => {
  const auth = useAuthStore()
  const limit = shallowRef(50)

  const query = useQuery<UserHistoryResponse>({
    key: () => ['GET', '/user/history', auth.token, limit.value],
    query: ({ signal }) => getUserHistory({ limit: limit.value, signal }),
    enabled: () => auth.isAuthenticated,
    staleTime: HISTORY_STALE_MS,
  })

  function setLimit(value: number): void {
    if (Number.isInteger(value) && value > 0 && value <= 100) {
      limit.value = value
    }
  }

  return {
    ...query,
    limit,
    setLimit,
  }
})

export const useScanHistoryItemQuery = defineQuery(() => {
  const auth = useAuthStore()
  const jobId = shallowRef('')

  const query = useQuery<UserHistoryItemResponse>({
    key: () => ['GET', '/user/history/:id', auth.token, jobId.value],
    query: ({ signal }) => getUserHistoryItem(jobId.value, signal),
    enabled: () => auth.isAuthenticated && Boolean(jobId.value),
    staleTime: HISTORY_STALE_MS,
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
