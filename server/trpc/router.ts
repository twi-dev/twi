import type {GlobalContext} from "./context.js"
import {trpc} from "./def.js"

import {stories} from "./routes/stories.js"
import {story} from "./routes/story.js"
import {user} from "./routes/user.js"

export const router = trpc.router({
  stories,
  story,
  user
})

export const createRouterCaller = (
  ctx: GlobalContext
) => router.createCaller(ctx)

export type Router = typeof router

export type RouterCaller = ReturnType<typeof router["createCaller"]>
