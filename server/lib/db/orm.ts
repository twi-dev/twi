import {MikroORM, type Options} from "@mikro-orm/mysql"

import {getConfig} from "./config.js"

let cached: Promise<MikroORM>

export const createORM = (config: Options) => MikroORM.init(config)

export async function getORM(): Promise<MikroORM> {
  if (!cached) {
    cached = createORM(await getConfig())
  }

  return cached
}

export async function closeConnection(): Promise<void> {
  if (!cached) {
    return
  }

  const orm = await cached
  if (orm && await orm.isConnected()) {
    await orm.close()
  }
}
