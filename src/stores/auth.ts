import { defineStore } from 'pinia'
import { computed, shallowRef } from 'vue'

import {
  clearAuthSession,
  readAuthSession,
  writeAuthSession,
  type AuthSession,
} from '@/api/auth-session'

export const useAuthStore = defineStore('auth', () => {
  const session = shallowRef<AuthSession | null>(readAuthSession())

  const token = computed(() => session.value?.token ?? '')
  const user = computed(() => session.value?.user ?? null)
  const userEmail = computed(() => session.value?.user.email ?? '')
  const userRole = computed(() => session.value?.user.role ?? 'user')
  const isAdmin = computed(() => userRole.value === 'admin')
  const isAuthenticated = computed(() => Boolean(session.value?.token))

  function setSession(nextSession: AuthSession): void {
    session.value = nextSession
    writeAuthSession(nextSession)
  }

  function logout(): void {
    session.value = null
    clearAuthSession()
  }

  return {
    isAuthenticated,
    isAdmin,
    logout,
    session,
    setSession,
    token,
    user,
    userEmail,
    userRole,
  }
})
