import {trpc} from "./def.js"

import {protectedProcedure} from "./routes/protected.js"
import {hello} from "./routes/hello.js"

import {story} from "./routes/story.js"
import {user} from "./routes/user.js"

export const router = trpc.router({
  protected: protectedProcedure,
  hello,

  story,
  user
})

export type Router = typeof router
