import {z} from "zod"

import {RootChildren} from "./RootChildren.js"

export const SlateEditor = z.object({
  children: z.array(RootChildren)
})

export type ISlateEditor = z.input<typeof SlateEditor>

export type OSlateEditor = z.output<typeof SlateEditor>
