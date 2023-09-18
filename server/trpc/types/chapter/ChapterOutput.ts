import {z} from "zod"

import {RootElements} from "../common/slate/RootElements.js"
import {ChapterBaseOutput} from "./ChapterBaseOutput.js"

export const ChapterOutput = ChapterBaseOutput.extend({
  content: z.optional(RootElements)
})

export type IChapterOutput = z.input<typeof ChapterOutput>

export type OChapterOutput = z.output<typeof ChapterOutput>
