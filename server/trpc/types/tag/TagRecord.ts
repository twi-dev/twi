import {z} from "zod"

import {Record} from "../common/Record.js"

import {TagBase} from "./TagBase.js"

export const TagRecord = Record.merge(TagBase)

export type ITagRecord = z.input<typeof TagRecord>

export type OTagRecord = z.output<typeof TagRecord>
