import type {Input, Output} from "valibot"
import {merge} from "valibot"

import {Node} from "./Node.js"
import {CommonDates} from "./CommonDates.js"

export const Record = merge([Node, CommonDates])

export type IRecord = Input<typeof Record>

export type ORecord = Output<typeof Record>
