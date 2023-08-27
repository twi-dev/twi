import {z} from "zod"

export const StoryBase = z.object({
  title: z.string().min(2)
})

export type IStoryBase = z.input<typeof StoryBase>

export type OStoryBase = z.output<typeof StoryBase>
