import {z} from "zod"

import {PlainText} from "./PlainText.js"

export const RichTextBase = PlainText.extend({
  bold: z.literal(true).optional(),
  italic: z.literal(true).optional(),
  underline: z.literal(true).optional(),
  strikethrough: z.literal(true).optional()
})

export type IRichTextBase = z.input<typeof RichTextBase>

export type ORichTextBase = z.output<typeof RichTextBase>
