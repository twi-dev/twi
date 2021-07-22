import {ExecutionContext, UntitledMacro} from "ava"
import {MikroORM} from "@mikro-orm/core"

import storage from "app/db/storage"

type MaybeContext<T extends object> =
  T extends ExecutionContext ? T : ExecutionContext<T>

export interface DatabaseContext {
  db: MikroORM
}

interface WithDatabaseCallback<C extends object> {
  (t: C): unknown
}

export type WithDatabaseMacro<T extends object = {}> = [
  WithDatabaseCallback<MaybeContext<T & DatabaseContext>>
]

export const withDatabase: UntitledMacro<
  WithDatabaseMacro<any>,
  DatabaseContext
> = async (t, implementation) => {
  await storage.run(t.context.db.em.fork(true, true), () => implementation(t))
}
