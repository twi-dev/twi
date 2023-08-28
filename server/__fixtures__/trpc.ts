import {IncomingMessage, ServerResponse} from "node:http"
import {Socket} from "node:net"

import {type RouterCaller, createRouterCaller} from "../trpc/router.js"
import {createCookieHeader} from "../__helpers__/createCookieHeader.js"
import {User} from "../db/entities.js"
import {H3Event} from "h3"

import {ormTest} from "./orm.js"

export interface TRPCTestContext {
  trpc: RouterCaller
  auth?: User
}

export const trpcTest = ormTest.extend<TRPCTestContext>({
  async trpc({auth}, use) {
    const req = new IncomingMessage(new Socket())
    const res = new ServerResponse(req)

    if (auth) {
      req.headers = Object.fromEntries(await createCookieHeader(auth))
    }

    const event = new H3Event(req, res)

    const caller = createRouterCaller({
      __$$createCallerContext$$__: true,
      event
    })

    await use(caller)
  }
})
