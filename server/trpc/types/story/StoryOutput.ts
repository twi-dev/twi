import {z} from "zod"

import {TagBaseOutput} from "../tag/TagBaseOutput"
import {createCollectionOutput} from "../../utils/createCollectionOutput.js"

import {StoryWithDescription} from "./StoryWithDescription.js"
import {StoryBaseOutput} from "./StoryBaseOutput.js"

export const StoryOutput = StoryBaseOutput
  .merge(StoryWithDescription)
  .extend({
    tags: z.optional(createCollectionOutput(TagBaseOutput))
  })

export type IStoryOutput = z.input<typeof StoryOutput>

export type OStoryOutput = z.output<typeof StoryOutput>
