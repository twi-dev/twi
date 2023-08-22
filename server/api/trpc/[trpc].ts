import {createNuxtApiHandler} from "trpc-nuxt"

import {router} from "../../../server/trpc/router.js"
import {createContext} from "../../../server/trpc/context.js"

export default createNuxtApiHandler({router, createContext})
