import {z} from "zod"

import {RichTextBase} from "./RichTextBase.js"

import {RichTextSubscriptFormat} from "./RichTextSubscriptFormat.js"
import {RichTextSuperscriptFormat} from "./RichTextSuperscriptFormat.js"

export const RichText = z.intersection(RichTextBase, z.union([
  RichTextSubscriptFormat,
  RichTextSuperscriptFormat
]))

export type IRichText = z.input<typeof RichText>

export type ORichText = z.output<typeof RichText>
