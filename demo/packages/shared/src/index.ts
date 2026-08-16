export const ROLES = ['admin', 'user'] as const

export type Role = (typeof ROLES)[number]

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
