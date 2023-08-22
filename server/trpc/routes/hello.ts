import {string, minLength} from "valibot"

import {procedure} from "../def.js"

export const hello = procedure
  .output(string([minLength(1)]))
  .query(() => "Hello, world!")
