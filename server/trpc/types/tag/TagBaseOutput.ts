import {object, string, minLength} from "valibot"
import type {Input, Output} from "valibot"

import {TagRecord} from "./TagRecord.js"

export const TagBaseOutput = object({
  ...TagRecord.entries,

  slug: string([minLength(2)])
})

export type ITagBaseOutput = Input<typeof TagBaseOutput>

export type OTagBaseOutput = Output<typeof TagBaseOutput>
