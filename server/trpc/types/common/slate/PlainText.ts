import {z} from "zod"

import {WithId} from "./WithId.js"

export const PlainText = WithId.extend({
  text: z.string()
})

export type IPlainText = z.input<typeof PlainText>

export type OPlainText = z.output<typeof PlainText>
