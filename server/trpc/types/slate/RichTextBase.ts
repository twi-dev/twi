import {literal, optional, object} from "valibot"
import type {Input, Output} from "valibot"

import {PlainText} from "./PlainText.js"

const OptionalTrue = optional(literal(true))

export const RichTextBase = object({
  ...PlainText.object,

  bold: OptionalTrue,
  italic: OptionalTrue,
  underline: OptionalTrue,
  strikethrough: OptionalTrue
})

export type IRichTextBase = Input<typeof RichTextBase>

export type ORichTextBase = Output<typeof RichTextBase>
