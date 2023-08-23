import {z} from "zod"

import {normalizeDate} from "../../../../lib/utils/normalizeDate.js"

export const DateTime = z
  .union([z.date(), z.string(), z.number()])
  .transform<Date>(date => normalizeDate(date))
  .transform<string>(date => date.toISOString())

export type IDateTime = z.input<typeof DateTime>

export type ODateTime = z.output<typeof DateTime>
