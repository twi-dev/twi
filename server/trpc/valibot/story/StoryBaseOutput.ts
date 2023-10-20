import type {Input, Output} from "valibot"
import {object} from "valibot"

import {UserOutput} from "../user/UserOutput.js"

import {StoryRecord} from "./StoryRecord.js"
import {StorySlug} from "./StorySlug.js"

export const StoryBaseOutput = object({
  ...StoryRecord.object,

  publisher: UserOutput,
  slug: StorySlug
})

export type IStoryBaseOutput = Input<typeof StoryBaseOutput>

export type OStoryBaseOutput = Output<typeof StoryBaseOutput>
