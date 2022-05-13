import {ExecutionContext, UntitledMacro, ImplementationResult} from "ava"
import {MikroORM, RequestContext} from "@mikro-orm/core"

type MaybeContext<T extends object> =
  T extends ExecutionContext ? T : ExecutionContext<T>

export interface DatabaseContext {
  db: MikroORM
}

interface WithOrmCallback<C extends object> {
  (t: C): ImplementationResult
}

export type WithOrmMacro<T extends object = {}> = [
  WithOrmCallback<MaybeContext<T & DatabaseContext>>
]

/**
 * Runs test implementation inside of it's own database context.
 *
 * @param t Test context (will be assigned by AVA)
 * @param implementation Test implementation
 */
export const withOrm: UntitledMacro<
  WithOrmMacro<any>,
  DatabaseContext
> = async (t, implementation) => {
  await RequestContext.createAsync(t.context.db.em, async () => {
    await implementation(t)
  })
}
