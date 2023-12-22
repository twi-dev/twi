/* eslint-disable indent */

import {actionIssue, actionOutput, type BaseValidation} from "valibot"

import {isStorySlugNameValid} from "../../../../../lib/utils/slug/storySlug.js"

export type SlugNameValidation<TInput extends string> =
  BaseValidation<TInput> & {type: "invalid_slug_name"}

export const name = <TInput extends string>(
  message: string = "Invalid slug name format"
): SlugNameValidation<TInput> => ({
  async: false,
  type: "invalid_slug_name",
  message,

  _parse(value) {
    if (!isStorySlugNameValid(value)) {
      return actionIssue(this.type, this.message, value)
    }

    return actionOutput(value)
  }
})
