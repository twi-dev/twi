import type {Options, EntityManager} from "@mikro-orm/mysql"
import {MikroORM} from "@mikro-orm/mysql"

import {getConfig} from "./config.js"

interface RunIsolatedCallback<T> {
  (em: EntityManager): T
}

let cached: Promise<MikroORM>

/**
 * Creates a new MikroORM instance with given options
 */
export const createORM = (config: Options) => MikroORM.init(config)

/**
 * Returns MikroORM instance.
 * Creates the new if one does not exists, then caches it
 */
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

export async function forkEntityManager(): Promise<EntityManager> {
  const orm = await getORM()

  return orm.em.fork()
}

/**
 * Runs given function with isolated EntityManager, created with `em.fork()`.
 *
 * Returns the result of the function and cleans that `em`
 *
 * @param fn
 */
export async function runIsolatied<T>(fn: RunIsolatedCallback<T>): Promise<T> {
  const em = await forkEntityManager()

  try {
    return await fn(em)
  } finally {
    em.clear()
  }
}
