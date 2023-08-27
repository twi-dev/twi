import {z} from "zod"

import type {StorySlug} from "../../../../lib/utils/slug/storySlug.js"

import {validateSuffix} from "./utils/validateSuffix.js"
import {validateName} from "./utils/validateName.js"

export const StorySlugString = z
  .string()
  .superRefine((slug, ctx): slug is StorySlug => {
    const [name, suffix] = slug.split("~")

    validateName(name, ctx)
    validateSuffix(suffix, ctx)

    return z.NEVER
  })
