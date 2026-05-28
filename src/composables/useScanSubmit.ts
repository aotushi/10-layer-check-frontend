import { computed, readonly, shallowRef } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { ApiRequestError } from '@/api/client'
import { useCreateScanJobMutation } from '@/queries/scans'
import { useAuthStore } from '@/stores/auth'

export function useScanSubmit() {
  const route = useRoute()
  const router = useRouter()
  const auth = useAuthStore()
  const createJob = useCreateScanJobMutation()
  const errorMessage = shallowRef('')
  const createdJobId = shallowRef('')

  const canSubmit = computed(() => !createJob.isLoading.value)

  async function submitScan(target: string): Promise<void> {
    const trimmedTarget = target.trim()
    errorMessage.value = ''
    createJob.reset()

    if (!trimmedTarget) {
      errorMessage.value = 'Enter a public domain before starting the scan.'
      return
    }

    if (!auth.isAuthenticated) {
      await router.push({
        name: 'login',
        query: {
          redirect: route.fullPath,
        },
      })
      return
    }

    try {
      const envelope = await createJob.mutateAsync({
        target: trimmedTarget,
      })
      const jobId = envelope.job?.id

      if (!jobId) {
        throw new Error('Scan job was created without a readable job id.')
      }

      createdJobId.value = jobId
      await router.push({ name: 'report-detail', params: { id: jobId } })
    } catch (error) {
      errorMessage.value = toScanSubmitMessage(error)
    }
  }

  return {
    canSubmit,
    createdJobId: readonly(createdJobId),
    errorMessage: readonly(errorMessage),
    isSubmitting: createJob.isLoading,
    submitScan,
  }
}

function toScanSubmitMessage(error: unknown): string {
  if (error instanceof ApiRequestError) {
    if (error.status === 0) {
      return error.message
    }

    return `Scan API returned ${error.status}: ${error.message}`
  }

  if (error instanceof TypeError) {
    return 'Cannot reach the scan API. Check the configured backend endpoint and try again.'
  }

  return error instanceof Error ? error.message : 'Scan request failed.'
}
