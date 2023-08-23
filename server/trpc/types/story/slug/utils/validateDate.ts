import type {RefinementCtx} from "zod"
import {ZodIssueCode} from "zod"

import {isSlugDateValid} from "../../../../../lib/utils/storySlug.js"

export function validateDate(value: string, ctx: RefinementCtx): void {
  if (!isSlugDateValid(value)) {
    ctx.addIssue({
      code: ZodIssueCode.invalid_string,
      message: "Invalid date format.",
      validation: "datetime"
    })
  }
}
