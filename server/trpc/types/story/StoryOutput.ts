import {z} from "zod"

import {StoryRecord} from "./StoryRecord.js"

// TODO: Add content field
export const StoryOutput = StoryRecord

export type IStoryOutput = z.input<typeof StoryOutput>

export type OStoryOutput = z.output<typeof StoryOutput>
