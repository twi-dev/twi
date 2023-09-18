import {z} from "zod"

import {RootChildren} from "./RootChildren.js"

export const RootElements = z.array(RootChildren).nonempty()

export type IRootElements = z.input<typeof RootElements>

export type ORootElements = z.output<typeof RootElements>
