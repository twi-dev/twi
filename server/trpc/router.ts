import {trpc} from "./def.js"

import {hello} from "./routes/hello.js"
import {user} from "./routes/user.js"

export const router = trpc.router({
  hello,
  user
})

export type Router = typeof router
