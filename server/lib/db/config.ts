import {defineConfig, type Options} from "@mikro-orm/mysql"

import {Story} from "../../db/entity/Story.js"
import {Chapter} from "../../db/entity/Chapter.js"
import {Category} from "../../db/entity/Category.js"
import {User} from "../../db/entity/User.js"
import {Tag} from "../../db/entity/Tag.js"

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
    entities: [User, Story, Chapter, Category, Tag]
  })
}
