import {z} from "zod"

import {Node} from "../common/Node.js"

import {TagBase} from "./TagBase.js"

export const TagNode = Node.merge(TagBase)

export type ITagNode = z.input<typeof TagNode>

export type OTagNode = z.output<typeof TagNode>
