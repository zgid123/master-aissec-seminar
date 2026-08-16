import { mkdir, readFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { DuckDBInstance, type DuckDBConnection } from '@duckdb/node-api'
import type { Role, UserRecord, UsersResponse } from '@demo/shared'

const dataDirectory = fileURLToPath(new URL('../data/', import.meta.url))
const databasePath = fileURLToPath(new URL('../data/users.duckdb', import.meta.url))
const schemaPath = fileURLToPath(new URL('./schema.sql', import.meta.url))
const seedPath = fileURLToPath(new URL('./seed.sql', import.meta.url))

let instancePromise: Promise<DuckDBInstance> | undefined
let initializationPromise: Promise<number> | undefined

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

export async function initializeDatabase(): Promise<number> {
  initializationPromise ??= withConnection(async (connection) => {
    const schema = await readFile(schemaPath, 'utf8')
    await connection.run(schema)

    const countReader = await connection.runAndReadAll('SELECT count(*) AS count FROM users')
    const currentCount = Number(countReader.getRowObjectsJson()[0]?.count ?? 0)
    if (currentCount > 0) return currentCount

    const seed = await readFile(seedPath, 'utf8')
    await connection.run(seed)
    return 1_000_000
  })

  return initializationPromise
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
        masked: role !== 'admin',
        queryMs: Number((performance.now() - startedAt).toFixed(1)),
      },
    }
  })
}
