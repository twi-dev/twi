import type {Input, Output} from "valibot"
import {object} from "valibot"

import {Description} from "../slate/Description.js"

import {StoryBaseOutput} from "./StoryBaseOutput.js"

export const StoryOutput = object({
  ...StoryBaseOutput.object,

  description: Description
})

export type IStoryOutput = Input<typeof StoryOutput>

export type OStoryOutput = Output<typeof StoryOutput>
