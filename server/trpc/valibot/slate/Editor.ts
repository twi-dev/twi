import type {Input, Output} from "valibot"
import {object, array} from "valibot"

import {RootChildren} from "./RootChildren.js"

export const Editor = object({
  children: array(RootChildren)
})

export type IEditor = Input<typeof Editor>

export type OEditor = Output<typeof Editor>
