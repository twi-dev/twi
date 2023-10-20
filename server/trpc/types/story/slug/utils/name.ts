import {getPipeIssues, getOutput, type PipeResult} from "valibot"

import {isStorySlugNameValid} from "../../../../../lib/utils/slug/storySlug.js"

export const name = (message?: string) => <TInput extends string>(
  value: TInput
): PipeResult<TInput> => {
  if (!isStorySlugNameValid(value)) {
    return getPipeIssues("regex", message ?? "Invalid slug name format", value)
  }

  return getOutput(value)
}
