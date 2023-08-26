import {z} from "zod"

import {ChapterBaseOutput} from "./ChapterBaseOutput.js"

export const ChapterOutput = ChapterBaseOutput.extend({
  content: z.optional(z.array(z.record(z.unknown())))
})

export type IChapterOutput = z.input<typeof ChapterOutput>

export type OChapterOutput = z.output<typeof ChapterOutput>
