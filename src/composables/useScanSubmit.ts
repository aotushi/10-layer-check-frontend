import { computed, readonly, shallowRef } from 'vue'
import { useRouter } from 'vue-router'

import { ApiRequestError } from '@/api/client'
import { createScanJob } from '@/api/scans'

export function useScanSubmit() {
  const router = useRouter()
  const isSubmitting = shallowRef(false)
  const errorMessage = shallowRef('')
  const createdJobId = shallowRef('')

  const canSubmit = computed(() => !isSubmitting.value)

  async function submitScan(target: string): Promise<void> {
    const trimmedTarget = target.trim()
    errorMessage.value = ''

    if (!trimmedTarget) {
      errorMessage.value = 'Enter a public domain before starting the scan.'
      return
    }

    isSubmitting.value = true

    try {
      const envelope = await createScanJob({
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
    } finally {
      isSubmitting.value = false
    }
  }

  return {
    canSubmit,
    createdJobId: readonly(createdJobId),
    errorMessage: readonly(errorMessage),
    isSubmitting: readonly(isSubmitting),
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
    return 'Cannot reach the local scan API. Start the Worker and try again.'
  }

  return error instanceof Error ? error.message : 'Scan request failed.'
}
