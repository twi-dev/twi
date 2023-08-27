import {z} from "zod"

export const StoryWithDescription = z.object({
  description: z.string().min(2)
})

export type IStoryWithDescription = z.input<typeof StoryWithDescription>

export type OStoryWithDescription = z.output<typeof StoryWithDescription>
