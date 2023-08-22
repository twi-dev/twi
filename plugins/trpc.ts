import {createTRPCNuxtClient, httpBatchLink} from "trpc-nuxt/client"
import {defineNuxtPlugin} from "#imports"

import SuperJSON from "superjson"

import type {Router} from "../server/trpc/router.js"

export default defineNuxtPlugin(() => {
  const trpc = createTRPCNuxtClient<Router>({
    transformer: SuperJSON,
    links: [
      httpBatchLink({
        url: "/api/trpc"
      })
    ]
  })

  return {
    provide: {
      trpc
    }
  }
})
