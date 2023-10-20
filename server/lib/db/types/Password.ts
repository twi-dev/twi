import {
  string,
  optional,
  transform,
  getPipeIssues,
  getOutput,
  type PipeResult
} from "valibot"

const bypassForTestEnv = () => <TInput extends string>(
  input: TInput
): PipeResult<TInput> => {
  if (process.env.NODE_ENV !== "test" && !input) {
    return getPipeIssues(
      "invalid_type",
      "Password is required for connection user",
      input
    )
  }

  return getOutput(input)
}

export const Password = transform(
  optional(string([bypassForTestEnv()])),

  input => input as string // Lying valibot, because the return value will be `string` normally
)
