import type {Input, Output} from "valibot"
import {union} from "valibot"

import {Blockquote} from "./Blockquote.js"
import {Paragraph} from "./Paragraph.js"

export const RootChildren = union([Paragraph, Blockquote])

export type IRootChildren = Input<typeof RootChildren>

export type ORootChildren = Output<typeof RootChildren>
