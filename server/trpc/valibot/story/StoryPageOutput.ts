import type {Input, Output} from "valibot"

import {createPageOutput} from "../utils/createPageOutput.js"
import {StoryPageInput} from "./StoryPageInput.js"

import {StoryBaseOutput} from "./StoryBaseOutput.js"

export const StoryPageOutput = createPageOutput(
  StoryBaseOutput,
  StoryPageInput
)

export type IStoryPageOutput = Input<typeof StoryPageOutput>

export type OStoryPageOutput = Output<typeof StoryPageOutput>
