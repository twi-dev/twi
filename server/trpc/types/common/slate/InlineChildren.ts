import {z} from "zod"

import {Text} from "./Text.js"
import {Anchor} from "./Anchor.js"

export const InlineChildren = z.union([Anchor, Text])

export type IInlineChildren = z.input<typeof InlineChildren>

export type OInlineChildren = z.output<typeof InlineChildren>
