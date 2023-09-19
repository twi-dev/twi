import {z} from "zod"

import {Blockquote} from "./Blockquote.js"
import {Paragraph} from "./Paragraph.js"

export const RootChildren = z.union([Paragraph, Blockquote])

export type IRootChildren = z.input<typeof RootChildren>

export type ORootChildren = z.output<typeof RootChildren>
