import {basename, extname} from "path"

import {MikroORM, EventSubscriber} from "@mikro-orm/core"
import {Container, Constructable} from "typedi"

import globby from "globby"

import storage from "./storage"

export interface ConnectOptions {
  synchronize?: boolean
  dropSchema?: boolean
  database?: string,
  logger?: Function
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

/**
 * Creates a new connection to database
 */
export async function connect({database}: ConnectOptions = {}) {
  const subscribers = await loadFromGlob<Constructable<EventSubscriber>>(
    [process.env.DATABASE_SUBSCRIBERS!]
  )

  const entities = await loadFromGlob([process.env.DATABASE_ENTITIES!])

  const orm = await MikroORM.init({
    type: "mysql",
    host: process.env.DATABASE_HOST || undefined,
    port: parseInt(process.env.DATABASE_PORT!, 10) || undefined,
    dbName: database || process.env.DATABASE_NAME!,
    user: process.env.DATABASE_USER || undefined,
    password: process.env.DATABASE_PASSWORD || undefined,
    subscribers: subscribers.map(Subscriber => new Subscriber()),
    entities: entities as any[],
    implicitTransactions: true,
    debug: true,

    context: () => storage.getStore()
  })

  // TODO: Remove this once I finish the MVP
  if (process.env.NODE_ENV !== "production") {
    const generator = orm.getSchemaGenerator()

    await generator.updateSchema(true, true, false)
  }

  Container.set<MikroORM>(MikroORM, orm)

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
