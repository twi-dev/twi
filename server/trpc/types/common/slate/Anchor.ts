import {z} from "zod"

import {createSlateElement} from "./utils/createSlateElement.js"
import {Text} from "./Text.js"

export const Anchor = createSlateElement({
  type: "a",
  shape: z.object({
    url: z.string().url(),
    children: z.array(Text).nonempty()
  })
})

export type IAnchor = z.input<typeof Anchor>

export type OAnchor = z.output<typeof Anchor>
