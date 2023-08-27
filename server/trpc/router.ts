import type {GlobalContext} from "./context.js"
import {trpc} from "./def.js"

import {protectedProcedure} from "./routes/protected.js"
import {hello} from "./routes/hello.js"

import {stories} from "./routes/stories.js"
import {story} from "./routes/story.js"
import {user} from "./routes/user.js"

export const router = trpc.router({
  protected: protectedProcedure,
  hello,

  stories,
  story,
  user
})

export const createRouterCaller = (
  ctx: GlobalContext
) => router.createCaller(ctx)

export type Router = typeof router

export type RouterCaller = ReturnType<typeof router["createCaller"]>
