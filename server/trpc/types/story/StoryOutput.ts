import {z} from "zod"

import {TagBaseOutput} from "../tag/TagBaseOutput"
import {createCollectionOutput} from "../../helpers/createCollectionOutput.js"

import {StoryBaseOutput} from "./StoryBaseOutput.js"

export const StoryOutput = StoryBaseOutput.extend({
  tags: z.optional(createCollectionOutput(TagBaseOutput))
})

export type IStoryOutput = z.input<typeof StoryOutput>

export type OStoryOutput = z.output<typeof StoryOutput>
