import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import type { ErrorResponse, Identity, LoginRequest } from '@demo/shared'
import { authenticate, login } from './auth.js'
import { initializeDatabase, listUsers } from './database.js'

type Variables = { identity: Identity }
const app = new Hono<{ Variables: Variables }>()

app.use('*', logger())
app.use('/api/*', cors({ origin: 'http://localhost:5173', allowHeaders: ['Authorization', 'Content-Type'] }))

app.get('/api/health', (c) => c.json({ status: 'ok' }))

app.post('/api/session', async (c) => {
  const credentials = await c.req.json<LoginRequest>().catch(() => null)
  if (!credentials) return c.json<ErrorResponse>({ error: 'Invalid request body' }, 400)

  const session = login(credentials)
  if (!session) return c.json<ErrorResponse>({ error: 'Invalid username or password' }, 401)
  return c.json(session)
})

app.use('/api/users/*', async (c, next) => {
  const identity = authenticate(c.req.header('Authorization'))
  if (!identity) return c.json<ErrorResponse>({ error: 'Authentication required' }, 401)
  c.set('identity', identity)
  await next()
})

app.get('/api/users', async (c) => {
  const identity = c.get('identity')
  const page = Math.max(1, Number.parseInt(c.req.query('page') ?? '1', 10) || 1)
  const requestedPageSize = Number.parseInt(c.req.query('pageSize') ?? '50', 10)
  const pageSize = [50, 100, 200, 500].includes(requestedPageSize) ? requestedPageSize : 50
  const search = (c.req.query('search') ?? '').trim().slice(0, 80)

  const result = await listUsers({ role: identity.role, page, pageSize, search })
  c.header('Cache-Control', 'no-store')
  return c.json(result)
})

app.onError((error, c) => {
  console.error(error)
  return c.json<ErrorResponse>({ error: 'Internal server error' }, 500)
})

const port = Number(process.env.PORT ?? 3000)
await initializeDatabase()

const server = serve({ fetch: app.fetch, port }, ({ port: listeningPort }) => {
  console.log(`DuckDB masking API listening on http://localhost:${listeningPort}`)
})

for (const signal of ['SIGINT', 'SIGTERM'] as const) {
  process.on(signal, () => server.close(() => process.exit(0)))
}
