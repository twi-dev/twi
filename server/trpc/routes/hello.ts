import {setTimeout} from "node:timers/promises"

import {z} from "zod"

import {procedure} from "../procedures/base.js"

export const hello = procedure
  .output(z.string().nonempty())
  .query(() => setTimeout(1000, "Hello, world!"))
