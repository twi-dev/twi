import {object, string, minLength} from "valibot"
import type {Input, Output} from "valibot"

export const StoryBase = object({
  title: string([minLength(2)])
})

export type IStoryBase = Input<typeof StoryBase>

export type OStoryBase = Output<typeof StoryBase>
