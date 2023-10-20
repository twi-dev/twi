import type {Input, Output} from "valibot"
import {merge} from "valibot"

import {Record} from "../common/Record.js"
import {TagBase} from "./TagBase.js"

export const TagRecord = merge([Record, TagBase])

export type ITagRecord = Input<typeof TagRecord>

export type OTagRecord = Output<typeof TagRecord>
