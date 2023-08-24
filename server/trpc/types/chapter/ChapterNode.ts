import {z} from "zod"

import {Node} from "../common/Node.js"

import {ChapterBase} from "./ChapterBase.js"

export const ChapterNode = Node.merge(ChapterBase)

export type IChapterNode = z.input<typeof ChapterNode>

export type OChapterNode = z.output<typeof ChapterNode>
