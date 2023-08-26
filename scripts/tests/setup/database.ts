import {createConnection} from "mysql2/promise.js"
import type {Options} from "@mikro-orm/mysql"
import {beforeAll, afterAll} from "vitest"
import {nanoid} from "nanoid/async"

import {getConfig} from "../../../server/lib/db/config.js"
import {createORM} from "../../../server/lib/db/orm.js"

async function getTestConfig(): Promise<Options> {
  // @ts-expect-error Override db name so we can pass it to getORM in tests
  process.env.DB_NAME = `__test__${await nanoid()}`

  return getConfig()
}

/**
 * Creates a new MySQL connection using mysql2 driver.
 *
 * **Important**: this function requires a user with database management access.
 * You'll probably gonna need to create a user that can manage databases with names starting with <dbName>__test__<randomString> name
 */
const createNativeConnection = (options: Options) => createConnection({
  port: options.port,
  user: options.user
})

beforeAll(async () => {
  const config = await getTestConfig()
  const connection = await createNativeConnection(config)

  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${config.dbName}\``)
  await connection.end()

  const orm = await createORM(config)

  const generator = orm.getSchemaGenerator()

  await generator.createSchema()
  await orm.close()
})

afterAll(async () => {
  const config = await getConfig()
  const orm = await createORM(config)

  const generator = orm.getSchemaGenerator()
  if (await orm.isConnected()) {
    await generator.dropDatabase(orm.config.get("dbName"))
    await orm.close()
  }
})
