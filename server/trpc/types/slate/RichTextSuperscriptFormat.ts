import type {Input, Output} from "valibot"
import {object, literal} from "valibot"

export const RichTextSuperscriptFormat = object({
  superscript: literal(true)
})

export type IRichTextSuperscriptFormat = Input<
  typeof RichTextSuperscriptFormat
>

export type ORichTextSuperscriptFormat = Output<
  typeof RichTextSuperscriptFormat
>
