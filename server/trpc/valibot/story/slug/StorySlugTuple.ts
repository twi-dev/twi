import type {Input, Output} from "valibot"
import {tuple, string} from "valibot"

import {suffix} from "./utils/suffix.js"
import {name} from "./utils/name.js"

export const StorySlugTuple = tuple([
  string([name()]),
  string([suffix()])
])

export type IStorySlugTuple = Input<typeof StorySlugTuple>

export type OStorySlugTuple = Output<typeof StorySlugTuple>
