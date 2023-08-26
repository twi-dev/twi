import {z} from "zod"

import {StoryBase} from "./StoryBase.js"

export const StoryCreateInput = StoryBase.pick({
  title: true,
  description: true
})

export type IStoryCreateInput = z.input<typeof StoryCreateInput>

export type OStoryCreateInput = z.output<typeof StoryCreateInput>
