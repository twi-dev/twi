import {type Input, type Output, object} from "valibot"

import {DateTime} from "./DateTime.js"

export const CommonDates = object({
  createdAt: DateTime,
  updatedAt: DateTime
})

export type ICommonDates = Input<typeof CommonDates>

export type OCommonDates = Output<typeof CommonDates>
