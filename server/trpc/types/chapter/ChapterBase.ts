import {z} from "zod"

export const ChapterBase = z.object({
  title: z.string().min(2),
  description: z.string().min(2),
  isDraft: z.boolean(),
  order: z.number().int().positive()
})

export type IChapterBase = z.input<typeof ChapterBase>

export type OChapterBase = z.output<typeof ChapterBase>
