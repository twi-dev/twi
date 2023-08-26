import {z} from "zod"

import {ChapterRecord} from "./ChapterRecord.js"

export const ChapterBaseOutput = ChapterRecord.extend({
  slug: z.string().min(2)
})

export type IChapterBaseOutput = z.input<typeof ChapterBaseOutput>

export type OChapterBaseOutput = z.output<typeof ChapterBaseOutput>
