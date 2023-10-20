import {union} from "valibot"
import type {Input, Output} from "valibot"

import {Text} from "./Text.js"
import {Anchor} from "./Anchor.js"

export const InlineChildren = union([Anchor, Text])

export type IInlineChildren = Input<typeof InlineChildren>

export type OInlineChildren = Output<typeof InlineChildren>
