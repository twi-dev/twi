import {z} from "zod"

import {DateTime} from "./DateTime.js"
import {Record} from "./Record.js"

export const RecordSoft = Record.extend({
  deletedAt: DateTime.nullable()
})

export type IRecordSoft = z.input<typeof RecordSoft>

export type ORecordSoft = z.output<typeof RecordSoft>
