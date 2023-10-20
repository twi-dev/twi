import type {Input, Output} from "valibot"
import {object} from "valibot"

import {RootElements} from "../slate/RootElements"

import {ChapterBaseOutput} from "./ChapterBaseOutput.js"

export const ChapterOutput = object({
  ...ChapterBaseOutput.object,

  contents: RootElements
})

export type IChapterOutput = Input<typeof ChapterOutput>

export type OChapterOutput = Output<typeof ChapterOutput>
