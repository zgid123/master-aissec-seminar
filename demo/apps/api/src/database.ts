import { mkdir, mkdtemp, readFile, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { DuckDBInstance, type DuckDBConnection } from '@duckdb/node-api'
import type { ExportEnvironment, Identity, Role, UserRecord, UsersResponse } from '@demo/shared'
import { hash } from 'bcryptjs'

const dataDirectory = fileURLToPath(new URL('../data/', import.meta.url))
const databasePath = fileURLToPath(new URL('../data/users.duckdb', import.meta.url))
const schemaPath = fileURLToPath(new URL('./schema.sql', import.meta.url))
const seedPath = fileURLToPath(new URL('./seed.sql', import.meta.url))

let instancePromise: Promise<DuckDBInstance> | undefined
let initializationPromise: Promise<number> | undefined

const demoAccounts = [
  {
    username: 'manager',
    password: 'manager',
    token: 'demo-manager',
    displayName: 'Mai - Quản lý',
    role: 'manager',
  },
  {
    username: 'support',
    password: 'support',
    token: 'demo-support',
    displayName: 'Nam - Hỗ trợ',
    role: 'support',
  },
] as const

export interface DemoAccountRecord extends Identity {
  passwordHash: string
  token: string
}

async function getInstance() {
  await mkdir(dataDirectory, { recursive: true })
  instancePromise ??= DuckDBInstance.fromCache(databasePath)
  return instancePromise
}

async function withConnection<T>(work: (connection: DuckDBConnection) => Promise<T>) {
  const instance = await getInstance()
  const connection = await instance.connect()
  try {
    return await work(connection)
  } finally {
    connection.closeSync()
  }
}

async function seedDemoAccounts(connection: DuckDBConnection) {
  const accountReader = await connection.runAndReadAll('SELECT username FROM demo_accounts')
  const existingUsernames = new Set(
    accountReader.getRowObjectsJson().map((row) => String(row.username)),
  )

  for (const account of demoAccounts) {
    if (existingUsernames.has(account.username)) continue

    const passwordHash = await hash(account.password, 12)
    await connection.run(
      `INSERT INTO demo_accounts (username, password_hash, token, display_name, role)
       VALUES ($username, $password_hash, $token, $display_name, $role)`,
      {
        username: account.username,
        password_hash: passwordHash,
        token: account.token,
        display_name: account.displayName,
        role: account.role,
      },
    )
  }
}

export async function initializeDatabase(): Promise<number> {
  initializationPromise ??= withConnection(async (connection) => {
    const schema = await readFile(schemaPath, 'utf8')
    await connection.run(schema)
    await seedDemoAccounts(connection)

    const countReader = await connection.runAndReadAll('SELECT count(*) AS count FROM users')
    const currentCount = Number(countReader.getRowObjectsJson()[0]?.count ?? 0)
    if (currentCount > 0) return currentCount

    const seed = await readFile(seedPath, 'utf8')
    await connection.run(seed)
    return 1_000_000
  })

  return initializationPromise
}

export async function findAccountByUsername(username: string): Promise<DemoAccountRecord | null> {
  await initializeDatabase()
  return withConnection(async (connection) => {
    const reader = await connection.runAndReadAll(
      `SELECT
         username,
         password_hash AS passwordHash,
         token,
         display_name AS displayName,
         role
       FROM demo_accounts
       WHERE username = $username`,
      { username },
    )
    return (reader.getRowObjectsJson()[0] as unknown as DemoAccountRecord | undefined) ?? null
  })
}

export async function findIdentityByToken(token: string): Promise<Identity | null> {
  await initializeDatabase()
  return withConnection(async (connection) => {
    const reader = await connection.runAndReadAll(
      `SELECT username, display_name AS displayName, role
       FROM demo_accounts
       WHERE token = $token`,
      { token },
    )
    return (reader.getRowObjectsJson()[0] as unknown as Identity | undefined) ?? null
  })
}

interface ExportUsersInput {
  environment: ExportEnvironment
  search: string
}

export interface UsersExport {
  filePath: string
  fileName: string
  cleanup: () => Promise<void>
}

export async function exportUsers({ environment, search }: ExportUsersInput): Promise<UsersExport> {
  await initializeDatabase()
  const exportDirectory = await mkdtemp(join(tmpdir(), 'duckdb-masking-export-'))
  const masked = environment !== 'production'
  const fileName = `customers-${environment}-${masked ? 'masked' : 'raw'}.csv`
  const filePath = join(exportDirectory, fileName)
  const escapedFilePath = filePath.replaceAll("'", "''")
  const searchPattern = `%${search.toLowerCase()}%`

  try {
    await withConnection(async (connection) => {
      await connection.run(
        `COPY (
           SELECT
             id,
             full_name,
             email,
             phone,
             address,
             national_id,
             strftime(created_at, '%Y-%m-%d') AS created_at
           FROM users_for_role($viewer_role)
           WHERE $search = '' OR lower(full_name) LIKE $search_pattern
           ORDER BY id
         ) TO '${escapedFilePath}' (FORMAT CSV, HEADER)`,
        {
          viewer_role: masked ? 'support' : 'manager',
          search,
          search_pattern: searchPattern,
        },
      )
    })

    return {
      filePath,
      fileName,
      cleanup: () => rm(exportDirectory, { recursive: true, force: true }),
    }
  } catch (error) {
    await rm(exportDirectory, { recursive: true, force: true })
    throw error
  }
}

interface ListUsersInput {
  role: Role
  page: number
  pageSize: number
  search: string
}

export async function listUsers({ role, page, pageSize, search }: ListUsersInput): Promise<UsersResponse> {
  await initializeDatabase()
  const startedAt = performance.now()
  const offset = (page - 1) * pageSize
  const searchPattern = `%${search.toLowerCase()}%`

  return withConnection(async (connection) => {
    const countReader = await connection.runAndReadAll(
      `SELECT count(*) AS count
       FROM users
       WHERE $search = '' OR lower(full_name) LIKE $search_pattern`,
      { search, search_pattern: searchPattern },
    )
    const total = Number(countReader.getRowObjectsJson()[0]?.count ?? 0)

    const userReader = await connection.runAndReadAll(
      `SELECT
         id,
         full_name AS fullName,
         email,
         phone,
         address,
         national_id AS nationalId,
         strftime(created_at, '%Y-%m-%d') AS createdAt
       FROM users_for_role($viewer_role)
       WHERE $search = '' OR lower(full_name) LIKE $search_pattern
       ORDER BY id
       LIMIT $page_size OFFSET $offset`,
      {
        viewer_role: role,
        search,
        search_pattern: searchPattern,
        page_size: pageSize,
        offset,
      },
    )

    return {
      data: userReader.getRowObjectsJson() as unknown as UserRecord[],
      meta: {
        page,
        pageSize,
        total,
        totalPages: Math.max(1, Math.ceil(total / pageSize)),
        role,
        masked: role !== 'manager',
        queryMs: Number((performance.now() - startedAt).toFixed(1)),
      },
    }
  })
}
