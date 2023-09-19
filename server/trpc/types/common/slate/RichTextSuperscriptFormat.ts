import {z} from "zod"

export const RichTextSuperscriptFormat = z.object({
  subscript: z.literal(true)
})

export type IRichTextSuperscriptFormat = z.input<
  typeof RichTextSuperscriptFormat
>

export type ORichTextSuperscriptFormat = z.output<
  typeof RichTextSuperscriptFormat
>
