import {TRPCError} from "@trpc/server"

import {middleware} from "../def.js"
import {isH3Context} from "../context.js"

export const withH3Context = middleware(({ctx, next}) => {
  if (!isH3Context(ctx)) {
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "H3Context required for this operation"
    })
  }

  return next({ctx})
})
