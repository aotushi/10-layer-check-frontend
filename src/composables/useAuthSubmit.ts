import { computed, readonly, shallowRef, toValue, type MaybeRefOrGetter } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import { ApiRequestError } from '@/api/client'
import type { AuthFieldPayload, AuthFormVisualState, AuthMode } from '@/content/authPage'
import { useLoginMutation, useRegisterMutation } from '@/queries/auth'
import { resolveAuthRedirect } from '@/router/redirect'
import { useAuthStore } from '@/stores/auth'

export function useAuthSubmit(mode: MaybeRefOrGetter<AuthMode>) {
  const route = useRoute()
  const router = useRouter()
  const auth = useAuthStore()
  const login = useLoginMutation()
  const register = useRegisterMutation()
  const errorMessage = shallowRef('')

  const activeMutation = computed(() => (toValue(mode) === 'login' ? login : register))
  const isSubmitting = computed(() => activeMutation.value.isLoading.value)
  const visualState = computed<AuthFormVisualState>(() => {
    if (isSubmitting.value) {
      return 'loading'
    }

    if (!errorMessage.value) {
      return 'idle'
    }

    return toValue(mode) === 'login' ? 'invalid-credentials' : 'server-error'
  })

  async function submitAuth(payload: AuthFieldPayload): Promise<void> {
    errorMessage.value = ''
    login.reset()
    register.reset()

    try {
      const response = await activeMutation.value.mutateAsync({
        email: payload.email.trim(),
        password: payload.password,
      })

      auth.setSession({
        token: response.token,
        user: response.user,
      })

      await router.push(resolveAuthRedirect(route.query.redirect))
    } catch (error) {
      errorMessage.value = toAuthMessage(error, toValue(mode))
    }
  }

  return {
    errorMessage: readonly(errorMessage),
    isSubmitting,
    submitAuth,
    visualState,
  }
}

function toAuthMessage(error: unknown, mode: AuthMode): string {
  if (error instanceof ApiRequestError) {
    if (error.status === 0) {
      return error.message
    }

    if (error.status === 401) {
      return 'Email or password did not match a saved account.'
    }

    if (error.status === 409) {
      return 'This email is already registered. Login instead.'
    }

    if (error.status === 503) {
      return 'Authentication service is not configured in the local Worker.'
    }

    return `Authentication API returned ${error.status}: ${error.message}`
  }

  if (error instanceof TypeError) {
    return 'Cannot reach the local auth API. Start the Worker and try again.'
  }

  return error instanceof Error
    ? error.message
    : mode === 'login'
      ? 'Login failed.'
      : 'Account creation failed.'
}
