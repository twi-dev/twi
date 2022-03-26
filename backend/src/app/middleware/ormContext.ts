import {MikroORM, RequestContext} from "@mikro-orm/core"
import {Container} from "typedi"
import {Middleware} from "koa"

/**
 * Creates a new request context
 */
const ormContext: Middleware = async (_ctx, next) => {
  const orm = Container.get(MikroORM)

  return RequestContext.createAsync(orm.em, next)
}

export default ormContext
