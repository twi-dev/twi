import {initTRPC} from "@trpc/server"

import Superjson from "superjson"

import type {GlobalContext} from "./context.js"

export const trpc = initTRPC.context<GlobalContext>().create({
  transformer: Superjson
})

export const {middleware, procedure, router, mergeRouters} = trpc
