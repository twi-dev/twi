import type {RefinementCtx} from "zod"
import {ZodIssueCode} from "zod"

import {isSlugNameValid} from "../../../../../lib/utils/storySlug.js"

export function validateName(value: string, ctx: RefinementCtx): void {
  if (!isSlugNameValid(value)) {
    ctx.addIssue({
      code: ZodIssueCode.invalid_string,
      message: "Invalid slug name format",
      validation: "regex"
    })
  }
}
