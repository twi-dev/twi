import {z} from "zod"

import {PlainText} from "./PlainText.js"
import {EmptyText} from "./EmptyText.js"
import {CodeText} from "./CodeText.js"
import {RichText} from "./RichText.js"

export const Text = z.union([RichText, CodeText, EmptyText, PlainText])

export type IText = z.input<typeof Text>

export type OText = z.output<typeof Text>
