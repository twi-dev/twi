import {z} from "zod"

import {SlateDescription} from "../common/slate/SlateDescription.js"

export const StoryWithDescription = z.object({
  description: SlateDescription
})

export type IStoryWithDescription = z.input<typeof StoryWithDescription>

export type OStoryWithDescription = z.output<typeof StoryWithDescription>
