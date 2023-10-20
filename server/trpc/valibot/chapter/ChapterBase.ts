import {
  object,
  string,
  number,
  boolean,
  minLength,
  integer,
  minValue,
  optional,
  nullable
} from "valibot"
import type {Input, Output} from "valibot"

import {Description} from "../slate/Description.js"

export const ChapterBase = object({
  title: string([minLength(2)]),
  description: Description,
  isDraft: optional(boolean(), true),
  order: nullable(number([integer(), minValue(1)]))
})

export type IChapterBase = Input<typeof ChapterBase>

export type OChapterBase = Output<typeof ChapterBase>
