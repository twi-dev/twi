import type {Input, Output} from "valibot"

import {object} from "valibot"

import {StorySlug} from "./StorySlug.js"

export const StoryGetBySlugInput = object({
  slug: StorySlug
})

export type IStoryGetBySlugInput = Input<typeof StoryGetBySlugInput>

export type OStoryGetBySlugInput = Output<typeof StoryGetBySlugInput>
