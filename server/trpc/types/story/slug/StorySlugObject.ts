import type {Input, Output} from "valibot"
import {object, string} from "valibot"

import {suffix} from "./utils/suffix.js"
import {name} from "./utils/name.js"

export const StorySlugObject = object({
  name: string([name()]),
  date: string([suffix()])
})

export type IStorySlugObject = Input<typeof StorySlugObject>

export type OStorySlugObject = Output<typeof StorySlugObject>
