import {object, string, minLength} from "valibot"
import type {Input, Output} from "valibot"

import {ChapterRecord} from "./ChapterRecord.js"

export const ChapterBaseOutput = object({
  ...ChapterRecord.object,

  slug: string([minLength(2)])
})

export type IChapterBaseOutput = Input<typeof ChapterBaseOutput>

export type OChapterBaseOutput = Output<typeof ChapterBaseOutput>
