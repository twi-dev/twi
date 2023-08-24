import {z} from "zod"

import {TagBase} from "./TagBase.js"

export const TagBaseOutput = TagBase.extend({
  slug: z.string().min(2)
})

export type ITagBaseOutput = z.input<typeof TagBaseOutput>

export type OTagBaseOutput = z.output<typeof TagBaseOutput>
