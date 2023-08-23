import {z} from "zod"

import {RecordSoft} from "../common/RecordSoft.js"

import {StoryNode} from "./StoryNode.js"

export const StoryRecord = RecordSoft.merge(StoryNode)

export type IStoryRecord = z.input<typeof StoryRecord>

export type OStoryRecord = z.output<typeof StoryRecord>
