import type {Input, Output} from "valibot"
import {object} from "valibot"

import {Node} from "../common/Node.js"

import {ChapterBase} from "./ChapterBase.js"

export const ChapterNode = object({
  ...Node.entries,
  ...ChapterBase.entries
})

export type IChapterNode = Input<typeof ChapterNode>

export type OChapterNode = Output<typeof ChapterNode>
