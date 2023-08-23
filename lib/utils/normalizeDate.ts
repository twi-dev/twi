import {parseISO, toDate} from "date-fns"
import {isString} from "lodash-es"

import type {RawDate} from "./types/RawDate.js"

export function normalizeDate(date: RawDate): Date {
  if (date instanceof Date) {
    return date
  }

  return isString(date) ? parseISO(date) : toDate(date)
}
