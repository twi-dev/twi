import {object, string, email} from "valibot"
import type {Input, Output} from "valibot"

import {UserLogInInput} from "./UserLogInInput.js"

export const UserSignUpInput = object({
  ...UserLogInInput.object,

  email: string([email()])
})

export type IUserSignUpInput = Input<typeof UserSignUpInput>

export type OUserSignUpInput = Output<typeof UserSignUpInput>
