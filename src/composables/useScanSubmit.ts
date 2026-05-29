import { computed, readonly, shallowRef } from 'vue'

const SCAN_MODEL_UPDATE_NOTICE = 'The model is under updating, U can check the example account data'

export function useScanSubmit() {
  const isSubmitting = shallowRef(false)
  const errorMessage = shallowRef('')
  const createdJobId = shallowRef('')

  const canSubmit = computed(() => !isSubmitting.value)

  async function submitScan(target: string): Promise<void> {
    const trimmedTarget = target.trim()
    errorMessage.value = ''
    createdJobId.value = ''

    if (!trimmedTarget) {
      errorMessage.value = 'Enter a public domain before starting the scan.'
      return
    }

    errorMessage.value = SCAN_MODEL_UPDATE_NOTICE
  }

  return {
    canSubmit,
    createdJobId: readonly(createdJobId),
    errorMessage: readonly(errorMessage),
    isSubmitting: readonly(isSubmitting),
    submitScan,
  }
}
