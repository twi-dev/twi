import {z} from "zod"

import {SlateDescription} from "../common/slate/SlateDescription.js"

export const ChapterBase = z.object({
  title: z.string().min(2),
  description: SlateDescription,
  isDraft: z.boolean(),
  order: z.number().int().positive()
})

export type IChapterBase = z.input<typeof ChapterBase>

export type OChapterBase = z.output<typeof ChapterBase>
