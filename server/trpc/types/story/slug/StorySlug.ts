/* eslint-disable @typescript-eslint/indent */

import {isString} from "lodash-es"
import {z} from "zod"

import type {
  StorySlug as StorySlugOutput
} from "../../../../lib/utils/slug/storySlug.js"

import {StorySlugObject} from "./StorySlugObject.js"
import {StorySlugString} from "./StorySlugString.js"
import {StorySlugTuple} from "./StorySlugTuple.js"

export const StorySlug = z
  .union([StorySlugObject, StorySlugTuple, StorySlugString])
  .transform<StorySlugOutput>(slug => {
    if (isString(slug)) {
      return slug
    }

    if (Array.isArray(slug)) {
      const [date, name] = slug

      return `${date}~${name}`
    }

    return `${slug.date}~${slug.name}`
  })

export type IStorySlug = z.input<typeof StorySlug>

export type OStorySlug = z.output<typeof StorySlug>
