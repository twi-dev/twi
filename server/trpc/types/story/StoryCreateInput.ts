import {z} from "zod"

import {StoryWithDescription} from "./StoryWithDescription.js"
import {StoryBase} from "./StoryBase.js"

export const StoryCreateInput = StoryBase.merge(StoryWithDescription)

export type IStoryCreateInput = z.input<typeof StoryCreateInput>

export type OStoryCreateInput = z.output<typeof StoryCreateInput>
