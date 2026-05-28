import { apiRequest } from './client'
import type { AuthCredentials, AuthResponse, CurrentUserResponse } from './types'

export function registerUser(input: AuthCredentials): Promise<AuthResponse> {
  return apiRequest<AuthResponse>('/user/register', {
    method: 'POST',
    body: {
      email: input.email,
      password: input.password,
    },
  })
}

export function loginUser(input: AuthCredentials): Promise<AuthResponse> {
  return apiRequest<AuthResponse>('/user/login', {
    method: 'POST',
    body: {
      email: input.email,
      password: input.password,
    },
  })
}

export function getCurrentUser(signal?: AbortSignal): Promise<CurrentUserResponse> {
  return apiRequest<CurrentUserResponse>('/user/me', { signal })
}
