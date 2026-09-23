import type { ExportEnvironment, UsersResponse } from '@demo/shared'
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
  if (!response.ok) throw new Error('Không thể tải dữ liệu khách hàng')
  return response.json() as Promise<UsersResponse>
}

export async function downloadUsersExport(environment: ExportEnvironment, search: string): Promise<void> {
  const session = getSession()
  const params = new URLSearchParams({ environment, search })
  const response = await fetch(`/api/users/export?${params}`, {
    headers: { Authorization: `Bearer ${session?.token ?? ''}` },
  })
  if (response.status === 401) {
    clearSession()
    window.location.assign('/login')
    throw new Error('Session expired')
  }
  if (!response.ok) {
    const payload = await response.json().catch(() => null) as { error?: string } | null
    throw new Error(payload?.error ?? 'Không thể export dữ liệu khách hàng')
  }

  const disposition = response.headers.get('Content-Disposition') ?? ''
  const fileName = disposition.match(/filename="([^"]+)"/)?.[1] ?? `customers-${environment}.csv`
  const objectUrl = URL.createObjectURL(await response.blob())
  const anchor = document.createElement('a')
  anchor.href = objectUrl
  anchor.download = fileName
  anchor.click()
  URL.revokeObjectURL(objectUrl)
}
