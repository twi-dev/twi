import {date, string, number, union, transform} from "valibot"
import type {Input, Output} from "valibot"

import {isString} from "lodash-es"
import {parseISO, toDate} from "date-fns"

export const DateTime = transform(
  transform(
    union([date(), string(), number()]),

    date => isString(date) ? parseISO(date) : toDate(date)
  ),

  value => value.toISOString()
)

export type IDateTime = Input<typeof DateTime>

export type ODateTime = Output<typeof DateTime>
