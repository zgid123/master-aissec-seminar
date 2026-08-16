import type { UsersResponse } from '@demo/shared'
import { clearSession, getSession } from './auth'

interface UsersQuery {
  page: number
  pageSize: number
  search: string
}

export async function fetchUsers({ page, pageSize, search }: UsersQuery): Promise<UsersResponse> {
  const session = getSession()
  const params = new URLSearchParams({
    page: String(page),
    pageSize: String(pageSize),
    search,
  })
  const response = await fetch(`/api/users?${params}`, {
    headers: { Authorization: `Bearer ${session?.token ?? ''}` },
  })
  if (response.status === 401) {
    clearSession()
    window.location.assign('/login')
    throw new Error('Session expired')
  }
  if (!response.ok) throw new Error('Unable to load users')
  return response.json() as Promise<UsersResponse>
}
