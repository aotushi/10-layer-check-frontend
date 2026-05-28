import { defineMutation, defineQuery, useMutation, useQuery } from '@pinia/colada'

import { getCurrentUser, loginUser, registerUser } from '@/api/auth'
import type { AuthCredentials, AuthResponse, CurrentUserResponse } from '@/api/types'
import { useAuthStore } from '@/stores/auth'

const CURRENT_USER_STALE_MS = 60_000

export const useCurrentUserQuery = defineQuery(() => {
  const auth = useAuthStore()

  return useQuery<CurrentUserResponse>({
    key: () => ['GET', '/user/me', auth.token],
    query: ({ signal }) => getCurrentUser(signal),
    enabled: () => auth.isAuthenticated,
    staleTime: CURRENT_USER_STALE_MS,
  })
})

export const useLoginMutation = defineMutation(() =>
  useMutation<AuthResponse, AuthCredentials>({
    key: ['POST', '/user/login'],
    mutation: (input) => loginUser(input),
  }),
)

export const useRegisterMutation = defineMutation(() =>
  useMutation<AuthResponse, AuthCredentials>({
    key: ['POST', '/user/register'],
    mutation: (input) => registerUser(input),
  }),
)
