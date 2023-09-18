import {z} from "zod"

import {WithId} from "./WithId.js"

export const PlainText = WithId.extend({
  text: z.string()
})
