import {z} from "zod"

import {createSlateElement} from "./utils/createSlateElement.js"
import {InlineChildren} from "./InlineChildren.js"

export const Paragraph = createSlateElement({
  type: "p",
  shape: z.object({
    children: z.array(InlineChildren).nonempty()
  })
})

export type IParagraph = z.input<typeof Paragraph>

export type OParagraph = z.output<typeof Paragraph>
