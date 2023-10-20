import type {Input, Output} from "valibot"
import {object} from "valibot"

import {RecordSoft} from "../common/RecordSoft.js"

import {ChapterBase} from "./ChapterBase.js"

export const ChapterRecord = object({
  ...RecordSoft.object,
  ...ChapterBase.object
})

export type IChapterRecord = Input<typeof ChapterRecord>

export type OChapterRecord = Output<typeof ChapterRecord>
