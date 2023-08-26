import {z} from "zod"

import {TagRecord} from "./TagRecord.js"

export const TagBaseOutput = TagRecord.extend({
  slug: z.string().min(2)
})

export type ITagBaseOutput = z.input<typeof TagBaseOutput>

export type OTagBaseOutput = z.output<typeof TagBaseOutput>
