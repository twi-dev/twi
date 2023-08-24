import type {RefinementCtx} from "zod"
import {ZodIssueCode} from "zod"

import {isStorySlugNameValid} from "../../../../../lib/utils/slug/storySlug.js"

export function validateName(value: string, ctx: RefinementCtx): void {
  if (!isStorySlugNameValid(value)) {
    ctx.addIssue({
      code: ZodIssueCode.invalid_string,
      message: "Invalid slug name format",
      validation: "regex"
    })
  }
}
