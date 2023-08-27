import {z} from "zod"

import {createPageOutput} from "../../utils/createPageOutput.js"

import {StoryPageInput} from "./StoryPageInput.js"
import {StoryBaseOutput} from "./StoryBaseOutput.js"

export const StoryPageOutput = createPageOutput(
  StoryBaseOutput,
  StoryPageInput
)

export type IStoryPageOutput = z.input<typeof StoryPageOutput>

export type OStoryPageOutput = z.output<typeof StoryPageOutput>
