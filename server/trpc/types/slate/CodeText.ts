import type {Input, Output} from "valibot"
import {literal, object} from "valibot"

import {PlainText} from "./PlainText.js"

export const CodeText = object({
  ...PlainText.object,

  code: literal(true)
})

export type ICodeText = Input<typeof CodeText>

export type OCodeText = Output<typeof CodeText>
