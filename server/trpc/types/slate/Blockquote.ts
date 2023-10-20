import {literal, object, array, minLength} from "valibot"
import type {Input, Output} from "valibot"

import {InlineChildren} from "./InlineChildren.js"

export const BLOCKQUOTE_ELEMENT_TYPE = "blockquote"

export type BlockquoteElementType = typeof BLOCKQUOTE_ELEMENT_TYPE

export const Blockquote = object({
  type: literal(BLOCKQUOTE_ELEMENT_TYPE),
  children: array(InlineChildren, [minLength(1)])
})

export type IBlockquote = Input<typeof Blockquote>

export type OBlockquote = Output<typeof Blockquote>
