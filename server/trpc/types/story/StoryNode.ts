import {z} from "zod"

import {Node} from "../common/Node.js"

import {StoryBase} from "./StoryBase.js"

export const StoryNode = Node.merge(StoryBase)

export type IStoryNode = z.input<typeof StoryNode>

export type OStoryNode = z.output<typeof StoryNode>
