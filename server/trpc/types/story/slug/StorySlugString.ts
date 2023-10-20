import type {Input, Output} from "valibot"
import {string, transform} from "valibot"

import type {
  StorySlug as StorySlugOutput
} from "../../../../lib/utils/slug/storySlug.js"

import {slug} from "./utils/slug.js"

export const StorySlugString = transform(
  string([slug()]),

  input => input as StorySlugOutput
)

export type IStorySlugString = Input<typeof StorySlugString>

export type OStorySlugString = Output<typeof StorySlugString>
