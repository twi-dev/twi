import {getPipeIssues, getOutput, type PipeResult} from "valibot"

import {
  isStorySlugSuffixValid
} from "../../../../../lib/utils/slug/storySlug.js"

export const suffix = (message?: string) => <TInput extends string>(
  input: TInput
): PipeResult<TInput> => {
  if (!isStorySlugSuffixValid(input)) {
    return getPipeIssues("regex", message ?? "Invalid suffix format", input)
  }

  return getOutput(input)
}
