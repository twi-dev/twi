import {date, string, number, union, transform} from "valibot"
import type {Input, Output} from "valibot"

import {normalizeDate} from "../../../../lib/utils/normalizeDate.js"

export const DateTime = transform(
  union([date(), string(), number()]),

  (value): string => normalizeDate(value).toISOString()
)

export type IDateTime = Input<typeof DateTime>

export type ODateTime = Output<typeof DateTime>
