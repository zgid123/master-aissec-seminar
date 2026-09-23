import { initializeDatabase } from './database.js'

const startedAt = performance.now()
const count = await initializeDatabase()
console.log(`DuckDB is ready with ${count.toLocaleString()} users in ${((performance.now() - startedAt) / 1000).toFixed(2)}s`)
