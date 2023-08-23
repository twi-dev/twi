import {defineConfig, type Options} from "@mikro-orm/mysql"

import * as subscribers from "../../db/subscribers.js"
import * as entities from "../../db/entities.js"

import {Config, type IConfig} from "./types/Config.js"

export async function getConfig(): Promise<Options> {
  const {
    dbName,
    host,
    port,
    user,
    password,
    debug
  } = await Config.parseAsync({
    dbName: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    debug: process.env.NODE_ENV
  } satisfies IConfig)

  return defineConfig({
    dbName,
    host,
    port,
    user,
    password,
    debug,
    implicitTransactions: true,
    entities: Object.values(entities),
    subscribers: Object.values(subscribers).map(Subscriber => new Subscriber())
  })
}
