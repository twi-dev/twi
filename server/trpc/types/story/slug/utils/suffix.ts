import {actionIssue, actionOutput, type BaseValidation} from "valibot"

import {
  isStorySlugSuffixValid
} from "../../../../../lib/utils/slug/storySlug.js"

export interface SlugSuffixValidation<
  TInput extends string
> extends BaseValidation<TInput> {
  type: "invalid_slug_suffix"

  requirement: typeof isStorySlugSuffixValid
}

export const suffix = <TInput extends string>(
  message: string = "Invalid suffix format"
): SlugSuffixValidation<TInput> => ({
  async: false,
  type: "invalid_slug_suffix",
  requirement: isStorySlugSuffixValid,
  expects: null,
  message,

  _parse(input) {
    if (this.requirement(input)) {
      return actionOutput(input)
    }

    return actionIssue(this, suffix, input, "slug suffix")
  }
})
