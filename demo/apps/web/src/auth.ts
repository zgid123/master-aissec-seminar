import type { LoginRequest, Session } from '@demo/shared'

const storageKey = 'duckdb-masking-session'

export function getSession(): Session | null {
  const raw = localStorage.getItem(storageKey)
  if (!raw) return null
  try {
    return JSON.parse(raw) as Session
  } catch {
    localStorage.removeItem(storageKey)
    return null
  }
}

export async function createSession(credentials: LoginRequest): Promise<Session> {
  const response = await fetch('/api/session', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  })
  const body = (await response.json()) as Session | { error: string }
  if (!response.ok) throw new Error('error' in body ? body.error : 'Login failed')
  const session = body as Session
  localStorage.setItem(storageKey, JSON.stringify(session))
  return session
}

export function clearSession() {
  localStorage.removeItem(storageKey)
}
