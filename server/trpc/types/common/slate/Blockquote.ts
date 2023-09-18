import {z} from "zod"

import {createSlateElement} from "./utils/createSlateElement.js"
import {InlineChildren} from "./InlineChildren.js"

export const Blockquote = createSlateElement({
  type: "blockquote",
  shape: z.object({
    children: z.array(InlineChildren).nonempty()
  })
})

export type IBlockquote = z.input<typeof Blockquote>

export type OBlockquote = z.output<typeof Blockquote>
