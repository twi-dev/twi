import {intersect, union} from "valibot"
import type {Input, Output} from "valibot"

import {RichTextBase} from "./RichTextBase.js"

import {RichTextSubscriptFormat} from "./RichTextSubscriptFormat.js"
import {RichTextSuperscriptFormat} from "./RichTextSuperscriptFormat.js"

export const RichText = intersect([
  RichTextBase,

  union([
    RichTextSubscriptFormat,
    RichTextSuperscriptFormat
  ])
])

export type IRichText = Input<typeof RichText>

export type ORichText = Output<typeof RichText>
