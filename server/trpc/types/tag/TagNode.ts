import type {Input, Output} from "valibot"
import {merge} from "valibot"

import {Node} from "../common/Node.js"
import {TagBase} from "./TagBase.js"

export const TagNode = merge([Node, TagBase])

export type ITagNode = Input<typeof TagNode>

export type OTagNode = Output<typeof TagNode>
