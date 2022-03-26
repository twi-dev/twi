import {basename, extname, resolve} from "path"

import {MikroORM, EventSubscriber, Options} from "@mikro-orm/core"
import {Container, Constructable} from "typedi"

import globby from "globby"

export interface GetConfigOptios {
  database?: string
  logging?: boolean
}

export interface ConnectOptions extends GetConfigOptios {
  synchronize?: boolean
  dropSchema?: boolean
}

async function loadFromGlob<T extends object>(
  patterns: string[]
): Promise<T[]> {
  const res: T[] = []

  for await (const path of globby.stream([...patterns, "!*.test.ts"])) {
    const stringPath = String(path)

    const name = basename(stringPath, extname(stringPath))
    const m = await import(stringPath)

    res.push(m.default || m[name])
  }

  return res
}

export async function getConfig({
  logging,
  database
}: GetConfigOptios = {}): Promise<Options> {
  const subscribers = await loadFromGlob<Constructable<EventSubscriber>>([
    process.env.DATABASE_SUBSCRIBERS!
  ])

  const entities = await loadFromGlob([process.env.DATABASE_ENTITIES!])

  return {
    subscribers: subscribers.map(Subscriber => new Subscriber()),
    entities: entities as any,
    debug: logging,
    type: "mysql",
    host: process.env.DATABASE_HOST || undefined,
    port: parseInt(process.env.DATABASE_PORT!, 10) || undefined,
    dbName: database || process.env.DATABASE_NAME!,
    user: process.env.DATABASE_USER || undefined,
    password: process.env.DATABASE_PASSWORD || undefined,
    implicitTransactions: true,
    migrations: {
      path: resolve("migration/schema")
    }
  }
}

/**
 * Connects to the database and returns an ORM instance
 */
export async function connect({
  database,
  synchronize,
  dropSchema,
  logging
}: ConnectOptions = {}) {
  const orm = await MikroORM.init(await getConfig({database, logging}))

  Container.set<MikroORM>(MikroORM, orm)

  const generator = orm.getSchemaGenerator()

  if (dropSchema) {
    await generator.dropSchema()
  }

  // TODO: Remove this once I finish the MVP
  if (process.env.NODE_ENV !== "production" || synchronize === true) {
    await generator.updateSchema({dropDb: false, dropTables: false, safe: true})
  }

  return orm
}

/**
 * Disconnects from database
 */
export async function disconnect(): Promise<void> {
  const orm = Container.get(MikroORM)

  if (orm && await orm.isConnected()) {
    return orm.close()
  }
}

export async function createConnection({
  database,
  synchronize,
  dropSchema,
  logging
}: ConnectOptions = {}): Promise<() => Promise<void>> {
  const orm = await connect({database, synchronize, dropSchema, logging})

  console.log("Connected to the database")

  return async function closeConnection() {
    console.log("Closing connection to the database")

    await orm.close()
  }
}
