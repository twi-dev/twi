import {z} from "zod"

export const TagBase = z.object({
  name: z.string().min(2),
})

export type ITagBase = z.input<typeof TagBase>

export type OTagBase = z.output<typeof TagBase>
