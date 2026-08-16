import type { Identity, LoginRequest, Session } from '@demo/shared'

interface DemoAccount extends Identity {
  password: string
  token: string
}

const accounts: DemoAccount[] = [
  {
    username: 'admin',
    password: 'admin',
    token: 'demo-admin',
    displayName: 'Admin User',
    role: 'admin',
  },
  {
    username: 'user',
    password: 'user',
    token: 'demo-user',
    displayName: 'Standard User',
    role: 'user',
  },
]

function toSession(account: DemoAccount): Session {
  return {
    username: account.username,
    displayName: account.displayName,
    role: account.role,
    token: account.token,
  }
}

export function login(credentials: LoginRequest): Session | null {
  const account = accounts.find(
    ({ username, password }) =>
      username === credentials.username && password === credentials.password,
  )
  return account ? toSession(account) : null
}

export function authenticate(authorization?: string): Identity | null {
  const [scheme, token] = authorization?.split(' ') ?? []
  if (scheme !== 'Bearer' || !token) return null

  const account = accounts.find((candidate) => candidate.token === token)
  if (!account) return null

  const { username, displayName, role } = account
  return { username, displayName, role }
}
