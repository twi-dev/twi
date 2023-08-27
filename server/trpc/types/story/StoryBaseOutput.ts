import {z} from "zod"

import {StorySlug} from "./StorySlug.js"
import {StoryRecord} from "./StoryRecord.js"
import {UserOutput} from "../user/UserOutput.js"

export const StoryBaseOutput = StoryRecord.extend({
  publisher: UserOutput,
  slug: StorySlug
})

export type IStoryBaseOutput = z.input<typeof StoryBaseOutput>

export type OStoryBaseOutput = z.output<typeof StoryBaseOutput>
