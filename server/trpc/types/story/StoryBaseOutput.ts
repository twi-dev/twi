import {z} from "zod"

import {StoryRecord} from "./StoryRecord.js"
import {StorySlug} from "./StorySlug.js"

export const StoryBaseOutput = StoryRecord.extend({
  slug: StorySlug
})

export type IStoryBaseOutput = z.input<typeof StoryBaseOutput>

export type OStoryBaseOutput = z.output<typeof StoryBaseOutput>
