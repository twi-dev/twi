import type {Input, Output} from "valibot"
import {string, minLength} from "valibot"

import {createTextType} from "./utils/creteTextType.js"

export const PlainText = createTextType(string([minLength(1)]))

export type IPlainText = Input<typeof PlainText>

export type OPlainText = Output<typeof PlainText>
