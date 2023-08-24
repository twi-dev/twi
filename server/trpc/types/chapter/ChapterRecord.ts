import {z} from "zod"

import {RecordSoft} from "../common/RecordSoft.js"

import {ChapterBase} from "./ChapterBase.js"

export const ChapterRecord = RecordSoft.merge(ChapterBase)

export type IChapterRecord = z.input<typeof ChapterRecord>

export type OChapterRecord = z.output<typeof ChapterRecord>
