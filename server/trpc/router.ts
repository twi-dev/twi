import {trpc} from "./def.js"

import {hello} from "./routes/hello.js"

export const router = trpc.router({
  hello
})

export type Router = typeof router
