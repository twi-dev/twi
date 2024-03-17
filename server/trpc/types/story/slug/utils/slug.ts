import {actionIssue, actionOutput, type BaseValidation} from "valibot"

import {
  isStorySlugNameValid,
  isStorySlugSuffixValid
} from "../../../../../lib/utils/slug/storySlug.js"

function validateSlug(value: string): boolean {
  const [name, suffix] = value.split("~")

  return [
    !!name && isStorySlugNameValid(name),
    !!suffix && isStorySlugSuffixValid(name)
  ].every(value => value === true)
}

export interface SlugValidation<
  TInput extends string
> extends BaseValidation<TInput> {
  type: "invalid_slug"

  requirement: typeof validateSlug
}

export const slug = <TInput extends string>(
  message: string = "Invalid slug format"
): SlugValidation<TInput> => ({
  async: false,
  type: "invalid_slug",
  expects: null,
  requirement: validateSlug,
  message,

  _parse(input) {
    if (this.requirement(input)) {
      return actionOutput(input)
    }

    return actionIssue(this, slug, input, "slug")
  }
})
