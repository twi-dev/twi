import {object, tuple, literal, string, url} from "valibot"
import type {Input, Output} from "valibot"

import {Text} from "./Text.js"

export const ANCHOR_ELEMENT_TYPE = "a"

export type AnchorElementType = typeof ANCHOR_ELEMENT_TYPE

export const Anchor = object({
  type: literal(ANCHOR_ELEMENT_TYPE),
  url: string([url()]),
  children: tuple([Text], Text)
})

export type IAnchor = Input<typeof Anchor>

export type OAnchor = Output<typeof Anchor>
