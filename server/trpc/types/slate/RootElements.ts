import type {Input, Output} from "valibot"
import {tuple} from "valibot"

import {RootChildren} from "./RootChildren.js"

export const RootElements = tuple([RootChildren], RootChildren)

export type IRootElements = Input<typeof RootElements>

export type ORootElements = Output<typeof RootElements>
