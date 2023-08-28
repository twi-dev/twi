import {RequestContext, MikroORM} from "@mikro-orm/core"
import {test} from "vitest"

import {getORM} from "../lib/db/orm.js"

export interface ORMTestContext {
  orm: MikroORM
}

export const ormTest = test.extend<ORMTestContext>({
  async orm({task: _}, use) {
    const orm = await getORM()

    await RequestContext.createAsync(orm.em, () => use(orm))
  }
})
