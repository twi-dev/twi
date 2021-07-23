import {ExecutionContext, UntitledMacro, ImplementationResult} from "ava"
import {MikroORM} from "@mikro-orm/core"

import storage from "app/db/storage"

type MaybeContext<T extends object> =
  T extends ExecutionContext ? T : ExecutionContext<T>

export interface DatabaseContext {
  db: MikroORM
}

interface WithDatabaseCallback<C extends object> {
  (t: C): ImplementationResult
}

export type WithDatabaseMacro<T extends object = {}> = [
  WithDatabaseCallback<MaybeContext<T & DatabaseContext>>
]

/**
 * Runs test implementation inside of it's own database context.
 *
 * @param t Test context (will be assigned by AVA)
 * @param implementation Test implementation
 */
export const withDatabase: UntitledMacro<
  WithDatabaseMacro<any>,
  DatabaseContext
> = async (t, implementation) => {
  await storage.run(t.context.db.em.fork(true, true), () => implementation(t))
}
