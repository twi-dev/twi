import {initTRPC} from "@trpc/server"
import {SuperJSON} from "superjson"

import type {GlobalContext} from "./context.js"

export const trpc = initTRPC.context<GlobalContext>().create({
  transformer: SuperJSON
})

export const {middleware, procedure, router, mergeRouters} = trpc
