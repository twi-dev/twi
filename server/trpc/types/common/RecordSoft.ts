import {object, merge, nullable} from "valibot"
import type {Input, Output} from "valibot"

import {Record} from "./Record.js"
import {DateTime} from "./DateTime.js"

export const RecordSoft = merge([
  Record,

  object({
    deletedAt: nullable(DateTime)
  })
])

export type IRecordSoft = Input<typeof RecordSoft>

export type ORecordSoft = Output<typeof RecordSoft>
