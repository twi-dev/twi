/* eslint-disable indent */

import {actionIssue, actionOutput, type BaseValidation} from "valibot"

import {
  isStorySlugNameValid,
  isStorySlugSuffixValid
} from "../../../../../lib/utils/slug/storySlug.js"

export type SlugValidation<TInput extends string> = BaseValidation<TInput> & {
  type: "invalid_slug"
}

export const slug = <TInput extends string>(
  message: string = "Invalid slug format"
): SlugValidation<TInput> => ({
  async: false,
  type: "invalid_slug",
  message,

  _parse(input) {
    const [name, suffix] = input.split("~")

    const isValid = [
      !!name && isStorySlugNameValid(name),
      !!suffix && isStorySlugSuffixValid(name)
    ].every(value => value === true)

    if (isValid) {
      return actionIssue(this.type, this.message, input)
    }

    return actionOutput(input)
  }
})
