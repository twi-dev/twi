import {literal, object, tuple} from "valibot"
import type {Input, Output} from "valibot"

import {InlineChildren} from "./InlineChildren.js"

export const PARAGRAPH_ELEMENT_TYPE = "p"

export type ParagraphElementType = typeof PARAGRAPH_ELEMENT_TYPE

export const Paragraph = object({
  type: literal(PARAGRAPH_ELEMENT_TYPE),
  children: tuple([InlineChildren], InlineChildren)
})

export type IParagraph = Input<typeof Paragraph>

export type OParagraph = Output<typeof Paragraph>
