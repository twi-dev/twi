import {z} from "zod"

import {PlainText} from "./PlainText.js"

export const RichText = PlainText.extend({
  bold: z.literal(true).optional(),
  italic: z.literal(true).optional(),
  underline: z.literal(true).optional(),
  strikethrough: z.literal(true).optional(),
  superscript: z.literal(true).optional(),
  subscript: z.literal(true).optional()
})

export type IRichText = z.input<typeof RichText>

export type ORichText = z.output<typeof RichText>
