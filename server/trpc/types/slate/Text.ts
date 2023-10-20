import type {Input, Output} from "valibot"
import {union} from "valibot"

import {PlainText} from "./PlainText.js"
import {EmptyText} from "./EmptyText.js"
import {CodeText} from "./CodeText.js"
import {RichText} from "./RichText.js"

export const Text = union([RichText, CodeText, EmptyText, PlainText])

export type IText = Input<typeof Text>

export type OText = Output<typeof Text>
