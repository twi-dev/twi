import {ormTest} from "./orm.js"

import {
  type RouterCaller,
  createRouterCaller
} from "../../../server/trpc/router.js"

export interface TRPCTestContext {
  trpc: RouterCaller
}

export const trpcTest = ormTest.extend<TRPCTestContext>({
  async trpc({task: _}, use) {
    // TODO: Mock authorization
    const caller = createRouterCaller({__$$createCallerContext: true})

    await use(caller)
  }
})
