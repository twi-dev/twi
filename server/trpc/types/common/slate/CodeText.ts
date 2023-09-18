import {z} from "zod"

import {PlainText} from "./PlainText.js"

export const CodeText = PlainText.extend({
  code: z.literal(true)
})

export type ICodeText = z.input<typeof CodeText>

export type OCodeText = z.output<typeof CodeText>
