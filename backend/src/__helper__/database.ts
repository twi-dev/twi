import {customAlphabet} from "nanoid/async"
import {urlAlphabet} from "nanoid"
import {Connection} from "typeorm"

import mysql from "mysql2/promise"

import {connect, disconnect} from "db"

const BASE = `twi-test__`

const createSuffix = customAlphabet(urlAlphabet.replace(/[^a-z0-9]/ig, ""), 6)

// Stores a database name for this AVA test process.
let name: string | null = null

/**
 * Creates a new MySQL connection using mysql2 driver.
 * Not meant for usage outside of this module.
 *
 * **Important**: this function requires a user with database management access.
 * You'll probably gonna need to create a user that can manage databases with names starting with twi-test__ name
 */
const createConnection = () => mysql.createConnection({
  host: process.env.DATABASE_HOST || undefined,
  port: parseInt(process.env.DATABASE_PORT!, 10) || undefined,
  user: process.env.DATABASE_USER || undefined,
  password: process.env.DATABASE_PASSWORD || undefined
})

/**
 * Creates a test database with unique name and starts a new TypeORM connection.
 * Use it once per each individual test file in `test.before()` hook.
 *
 * @returns TypeORM Connection instance
 */
export async function setupConnection(): Promise<Connection> {
  name = `${BASE}${await createSuffix()}`

  const connection = await createConnection()

  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${name}\``)
  await connection.end()

  // Create the actual connection
  return connect({database: name, synchronize: true})
}

/**
 * Removed a database created for this test file earlier and closes the TypeORM connection.
 * Use it once per each individual test file in `test.after()` hook.
 */
export async function cleanupConnection(): Promise<void> {
  if (!name) {
    throw new Error(`Database was not created. Run createDatabase hook first.`)
  }

  const connection = await createConnection()

  await disconnect()
  await connection.query(`DROP DATABASE IF EXISTS \`${name}\``)
  await connection.end()
}
