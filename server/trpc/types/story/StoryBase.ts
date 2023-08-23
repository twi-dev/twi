import {z} from "zod"

import {StorySlug} from "./StorySlug.js"

export const StoryBase = z.object({
  title: z.string().min(2),
  description: z.string().min(2),
  slug: StorySlug
})

export type IStoryBase = z.input<typeof StoryBase>

export type OStoryBase = z.output<typeof StoryBase>
