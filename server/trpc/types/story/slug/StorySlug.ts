import type {Input, Output} from "valibot"
import {union, transform} from "valibot"
import {isString} from "lodash-es"

import type {
  StorySlug as StorySlugOutput
} from "../../../../lib/utils/slug/storySlug.js"

import {StorySlugObject} from "./StorySlugObject.js"
import {StorySlugString} from "./StorySlugString.js"
import {StorySlugTuple} from "./StorySlugTuple.js"

export const StorySlug = transform(
  union([
    StorySlugObject,
    StorySlugTuple,
    StorySlugString
  ]),

  (slug): StorySlugOutput => {
    if (isString(slug)) {
      return slug
    }

    if (Array.isArray(slug)) {
      const [name, suffix] = slug

      return `${name}~${suffix}`
    }

    return `${slug.name}~${slug.suffix}`
  }
)

export type IStorySlug = Input<typeof StorySlug>

export type OStorySlug = Output<typeof StorySlug>
