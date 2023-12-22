import {
  string,
  optional,
  transform,
  actionIssue,
  actionOutput
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
      return actionIssue(this.type, this.message, input)
    }

    return actionOutput(input)
  }
})

export const Password = transform(
  optional(string([bypassPwd()])),

  input => input as string // Lying to valibot, because the return value will be `string` normally
)
