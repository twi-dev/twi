import {resolve, join} from "path"

import {Container} from "typedi"
import {MikroORM, EventSubscriber, Options} from "@mikro-orm/core"

import {Constructable} from "helper/type/Constructable"

import classFromPath from "helper/util/readClassFromPath"
import arrayFromAsync from "helper/array/fromAsync"

export interface GetConfigOptios {
  database?: string
  logging?: boolean
}

export interface ConnectOptions extends GetConfigOptios {
  synchronize?: boolean
  dropSchema?: boolean
}

type Subscriber = Constructable<EventSubscriber>

const ROOT = resolve(__dirname, "..", "..")
const SUBSCRIBERS_ROOT = join(ROOT, "subscriber")
const ENTITIES_ROOT = join(ROOT, "entity")

export async function getConfig({
  logging,
  database
}: GetConfigOptios = {}): Promise<Options> {
  const subscribers = await arrayFromAsync<Subscriber, EventSubscriber>(
    classFromPath(SUBSCRIBERS_ROOT, "*Subscriber"),

    // Instaniate subscribers for MikroORM.init
    Subscriber => new Subscriber()
  )

  const entities = await arrayFromAsync(classFromPath(ENTITIES_ROOT))

  return {
    entities,
    subscribers,
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
