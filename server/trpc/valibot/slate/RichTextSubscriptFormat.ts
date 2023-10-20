import type {Input, Output} from "valibot"
import {object, literal} from "valibot"

export const RichTextSubscriptFormat = object({
  subscript: literal(true)
})

export type IRichTextSubscriptFormat = Input<typeof RichTextSubscriptFormat>

export type ORichTextSubscriptFormat = Output<typeof RichTextSubscriptFormat>
