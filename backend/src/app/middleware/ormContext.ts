import {MikroORM} from "@mikro-orm/core"
import {Container} from "typedi"
import {Middleware} from "koa"

import storage from "app/db/storage"

const ormContext: Middleware = async (_ctx, next) => {
  const orm = Container.get(MikroORM)

  await storage.run(orm.em.fork(true, true), next)
}

export default ormContext
