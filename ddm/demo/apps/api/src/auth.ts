import type { Identity, LoginRequest, Session } from '@demo/shared'
import { compare } from 'bcryptjs'
import { findAccountByUsername, findIdentityByToken, type DemoAccountRecord } from './database.js'

function toSession(account: DemoAccountRecord): Session {
  return {
    username: account.username,
    displayName: account.displayName,
    role: account.role,
    token: account.token,
  }
}

export async function login(credentials: LoginRequest): Promise<Session | null> {
  const account = await findAccountByUsername(credentials.username)
  if (!account) return null

  const passwordMatches = await compare(credentials.password, account.passwordHash)
  return passwordMatches ? toSession(account) : null
}

export async function authenticate(authorization?: string): Promise<Identity | null> {
  const [scheme, token] = authorization?.split(' ') ?? []
  if (scheme !== 'Bearer' || !token) return null

  return findIdentityByToken(token)
}
