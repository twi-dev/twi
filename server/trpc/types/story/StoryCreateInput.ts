import type {Input, Output} from "valibot"
import {object} from "valibot"

import {Description} from "../slate/Description.js"

import {StoryBase} from "./StoryBase.js"

export const StoryCreateInput = object({
  ...StoryBase.entries,

  description: Description
})

export type IStoryCreateInput = Input<typeof StoryCreateInput>

export type OStoryCreateInput = Output<typeof StoryCreateInput>
