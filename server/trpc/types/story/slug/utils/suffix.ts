/* eslint-disable indent */

import {getPipeIssues, getOutput, type BaseValidation} from "valibot"

import {
  isStorySlugSuffixValid
} from "../../../../../lib/utils/slug/storySlug.js"

export type SlugSuffixValidation<TInput extends string> =
  BaseValidation<TInput> & {type: "invalid_slug_suffix"}

export const suffix = <TInput extends string>(
  message: string = "Invalid suffix format"
): SlugSuffixValidation<TInput> => ({
  async: false,
  type: "invalid_slug_suffix",
  message,

  _parse(input) {
    if (!isStorySlugSuffixValid(input)) {
      return getPipeIssues(this.type, this.message, input)
    }

    return getOutput(input)
  }
})
