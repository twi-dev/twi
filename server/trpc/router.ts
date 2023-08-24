import {trpc} from "./def.js"

import {hello} from "./routes/hello.js"
import {story} from "./routes/story.js"
import {user} from "./routes/user.js"

export const router = trpc.router({
  hello,
  story,
  user
})

export type Router = typeof router
