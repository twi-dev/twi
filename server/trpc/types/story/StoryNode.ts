import type {Input, Output} from "valibot"
import {object} from "valibot"

import {Node} from "../common/Node.js"

import {StoryBase} from "./StoryBase.js"

export const StoryNode = object({
  ...Node.entries,
  ...StoryBase.entries
})

export type IStoryNode = Input<typeof StoryNode>

export type OStoryNode = Output<typeof StoryNode>
