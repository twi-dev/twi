import {getPipeIssues, getOutput, type PipeResult} from "valibot"

import {
  isStorySlugNameValid,
  isStorySlugSuffixValid
} from "../../../../../lib/utils/slug/storySlug.js"

export const slug = (message?: string) => <TInput extends string>(
  input: TInput
): PipeResult<TInput> => {
  const [name, suffix] = input.split("~")

  const isValid = [
    !!name && isStorySlugNameValid(name),
    !!suffix && isStorySlugSuffixValid(name)
  ].every(value => value === true)

  if (isValid) {
    return getPipeIssues("regex", message ?? "Invalid slug format", input)
  }

  return getOutput(input)
}
