import {RequestContext} from "@mikro-orm/core"

import {getORM} from "../../lib/db/orm.js"
import {middleware} from "../def.js"

export const withORM = middleware(async ({ctx, next}) => {
  const orm = await getORM()

  return RequestContext.createAsync(orm.em, () => next({ctx: {...ctx, orm}}))
})
