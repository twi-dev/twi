import type {Input, Output} from "valibot"
import {union, literal} from "valibot"

export const NodeEnv = union([
  literal("development"),
  literal("production"),
  literal("test")
])

export type INodeEnv = Input<typeof NodeEnv>

export type ONodeEnv = Output<typeof NodeEnv>
