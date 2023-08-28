import {type RouterCaller, createRouterCaller} from "../trpc/router.js"
import {createCookieHeader} from "../__helpers__/createCookieHeader.js"
import {createFakeH3Event} from "../__helpers__/createFakeH3Event.js"
import {User} from "../db/entities.js"

import {ormTest} from "./orm.js"

export interface TRPCTestContext {
  trpc: RouterCaller
  auth?: User
}

export const trpcTest = ormTest.extend<TRPCTestContext>({
  async trpc({auth}, use) {
    const event = createFakeH3Event()

    if (auth) {
      event.node.req.headers = Object.fromEntries(
        await createCookieHeader(auth)
      )
    }

    const caller = createRouterCaller({
      __$$createCallerContext$$__: true,
      event
    })

    await use(caller)
  }
})
