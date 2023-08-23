import {z} from "zod"

import {isString} from "lodash-es"
import {parseISO, toDate} from "date-fns"

export const DateTime = z
  .union([z.date(), z.string(), z.number()])
  .transform(date => isString(date) ? parseISO(date) : toDate(date))
  .transform(date => date.toISOString())

export type IDateTime = z.input<typeof DateTime>

export type ODateTime = z.input<typeof DateTime>
