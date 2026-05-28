const DEFAULT_AUTH_REDIRECT = '/dashboard/history'

export function resolveAuthRedirect(value: unknown, fallback = DEFAULT_AUTH_REDIRECT): string {
  const candidate = Array.isArray(value) ? value[0] : value

  if (typeof candidate !== 'string' || !candidate.startsWith('/') || candidate.startsWith('//')) {
    return fallback
  }

  const path = candidate.split(/[?#]/u)[0]
  if (path === '/login' || path === '/register') {
    return fallback
  }

  return candidate
}

export function withRedirect(path: string, redirect: unknown): string {
  const target = resolveAuthRedirect(redirect, '')
  if (!target) {
    return path
  }

  const params = new URLSearchParams({ redirect: target })
  return `${path}?${params.toString()}`
}
