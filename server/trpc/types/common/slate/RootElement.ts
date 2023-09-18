import {z} from "zod"

import {Paragraph} from "./Paragraph.js"
import {Blockquote} from "./Blockquote.js"

export const RootElement = z
  .array(z.union([Paragraph, Blockquote]))
  .nonempty()

export type IRootElement = z.input<typeof RootElement>

export type ORootElement = z.output<typeof RootElement>
