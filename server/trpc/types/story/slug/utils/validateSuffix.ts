import type {RefinementCtx} from "zod"
import {ZodIssueCode} from "zod"

import {
  isStorySlugSuffixValid
} from "../../../../../lib/utils/slug/storySlug.js"

export function validateSuffix(value: string, ctx: RefinementCtx): void {
  if (!isStorySlugSuffixValid(value)) {
    ctx.addIssue({
      code: ZodIssueCode.invalid_string,
      message: "Invalid suffix format.",
      validation: "regex"
    })
  }
}
