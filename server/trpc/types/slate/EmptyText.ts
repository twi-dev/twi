import type {Input, Output} from "valibot"
import {literal} from "valibot"

import {createTextType} from "./utils/creteTextType.js"

export const EmptyText = createTextType(literal(""))

export type IEmptyText = Input<typeof EmptyText>

export type OEmptyText = Output<typeof EmptyText>
