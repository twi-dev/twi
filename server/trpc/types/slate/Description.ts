import type {Input, Output} from "valibot"
import {tuple, union} from "valibot"

import {Paragraph} from "./Paragraph.js"
import {Blockquote} from "./Blockquote.js"

const DescriptionUnion = union([Paragraph, Blockquote])

export const Description = tuple([DescriptionUnion], DescriptionUnion)

export type IDescription = Input<typeof Description>

export type ODescription = Output<typeof Description>
