export const ROLES = ['manager', 'bi', 'tester', 'support'] as const
export const EXPORT_ENVIRONMENTS = ['production', 'staging', 'dev'] as const

export type Role = (typeof ROLES)[number]
export type ExportEnvironment = (typeof EXPORT_ENVIRONMENTS)[number]

export interface Identity {
  username: string
  displayName: string
  role: Role
}

export interface Session extends Identity {
  token: string
}

export interface UserRecord {
  id: number
  fullName: string
  email: string
  phone: string
  address: string
  nationalId: string
  createdAt: string
}

export interface UsersResponse {
  data: UserRecord[]
  meta: {
    page: number
    pageSize: number
    total: number
    totalPages: number
    role: Role
    masked: boolean
    queryMs: number
  }
}

export interface LoginRequest {
  username: string
  password: string
}

export interface ErrorResponse {
  error: string
}
