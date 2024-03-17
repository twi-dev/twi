import {actionIssue, actionOutput, type BaseValidation} from "valibot"

import {isStorySlugNameValid} from "../../../../../lib/utils/slug/storySlug.js"

export interface SlugNameValidation<T extends string> extends BaseValidation<T> {
  type: "invalid_slug_name"

  requirement: typeof isStorySlugNameValid
}

export const name = <TInput extends string>(
  message: string = "Invalid slug name format"
): SlugNameValidation<TInput> => ({
  async: false,
  type: "invalid_slug_name",
  expects: null,
  requirement: isStorySlugNameValid,
  message,

  _parse(value) {
    if (this.requirement(value)) {
      return actionOutput(value)
    }

    return actionIssue(this, name, value, "slug name")
  }
})
