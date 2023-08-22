import {type Input, type Output, merge} from "valibot"

import {CommonDates} from "./CommonDates.js"
import {Node} from "./Node.js"

export const Record = merge([Node, CommonDates])

export type IRecord = Input<typeof Record>

export type ORecord = Output<typeof Record>
