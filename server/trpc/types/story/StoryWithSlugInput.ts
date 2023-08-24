import {z} from "zod"

import {StorySlug} from "./StorySlug.js"

export const StoryWithSlugInput = z.object({
  slug: StorySlug
})

export type IStoryWithSlugInput = z.input<typeof StoryWithSlugInput>

export type OStoryWithSlugInput = z.output<typeof StoryWithSlugInput>
