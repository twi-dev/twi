import {setTimeout} from "node:timers/promises"

import {string, minLength} from "valibot"

import {procedure} from "../def.js"

export const hello = procedure
  .output(string([minLength(1)]))
  .query(() => setTimeout(1000, "Hello, world!"))
