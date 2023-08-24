import {z} from "zod"

import type {StorySlug} from "../../../../lib/utils/slug/storySlug.js"

import {validateSuffix} from "./utils/validateSuffix.js"
import {validateName} from "./utils/validateName.js"

export const StorySlugString = z
  .string()
  .superRefine((slug, ctx): slug is StorySlug => {
    const [date, name] = slug.split("/")

    validateSuffix(date, ctx)
    validateName(name, ctx)

    return z.NEVER
  })
