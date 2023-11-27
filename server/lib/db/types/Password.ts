import {
  string,
  optional,
  transform,
  getPipeIssues,
  getOutput
} from "valibot"
import type {BaseValidation} from "valibot"

type PasswordValidation<TInput extends string> = BaseValidation<TInput> & {
  type: "db_password_required"
}

// This validator bypasses password check for test environment
const bypassPwd = <TInput extends string>(): PasswordValidation<TInput> => ({
  async: false,
  type: "db_password_required",
  message: "Password is required for connection user",
  _parse(input) {
    if (process.env.NODE_ENV !== "test" && !input) {
      return getPipeIssues(this.type, this.message, input)
    }

    return getOutput(input)
  }
})

export const Password = transform(
  optional(string([bypassPwd()])),

  input => input as string // Lying valibot, because the return value will be `string` normally
)
