import type {Input, Output} from "valibot"
import {object} from "valibot"

import {RecordSoft} from "../common/RecordSoft.js"

import {StoryNode} from "./StoryNode.js"

export const StoryRecord = object({
  ...RecordSoft.entries,
  ...StoryNode.entries
})

export type IStoryRecord = Input<typeof StoryRecord>

export type OStoryRecord = Output<typeof StoryRecord>
