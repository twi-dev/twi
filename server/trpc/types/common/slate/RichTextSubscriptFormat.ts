import {z} from "zod"

export const RichTextSubscriptFormat = z.object({
  subscript: z.literal(true)
})

export type IRichTextSubscriptFormat = z.input<typeof RichTextSubscriptFormat>

export type ORichTextSubscriptFormat = z.output<typeof RichTextSubscriptFormat>
