import type { UserProfile, UserRole } from './types'

const AUTH_SESSION_KEY = 'site-10-layer-check.auth.v1'

export type AuthSession = {
  token: string
  user: UserProfile
}

export function readAuthSession(): AuthSession | null {
  if (!canUseStorage()) {
    return null
  }

  const raw = window.localStorage.getItem(AUTH_SESSION_KEY)
  if (!raw) {
    return null
  }

  try {
    const value = JSON.parse(raw) as unknown
    return isAuthSession(value) ? value : null
  } catch {
    return null
  }
}

export function writeAuthSession(session: AuthSession): void {
  if (!canUseStorage()) {
    return
  }

  window.localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(session))
}

export function clearAuthSession(): void {
  if (!canUseStorage()) {
    return
  }

  window.localStorage.removeItem(AUTH_SESSION_KEY)
}

export function readAuthToken(): string | null {
  return readAuthSession()?.token ?? null
}

function canUseStorage(): boolean {
  return typeof window !== 'undefined' && Boolean(window.localStorage)
}

function isAuthSession(value: unknown): value is AuthSession {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return false
  }

  const record = value as Record<string, unknown>
  const user = record.user
  if (!user || typeof user !== 'object' || Array.isArray(user)) {
    return false
  }

  const userRecord = user as Record<string, unknown>
  const role = userRecord.role
  return (
    typeof record.token === 'string' &&
    record.token.length > 0 &&
    typeof userRecord.id === 'string' &&
    typeof userRecord.email === 'string' &&
    (role === undefined || isUserRole(role))
  )
}

function isUserRole(value: unknown): value is UserRole {
  return value === 'user' || value === 'admin'
}
