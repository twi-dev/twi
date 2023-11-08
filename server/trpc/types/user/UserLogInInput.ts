import {object, string, minLength} from "valibot"
import type {Input, Output} from "valibot"

import {UserBase} from "./UserBase.js"

export const UserLogInInput = object({
  ...UserBase.entries,

  password: string([minLength(5)])
})

export type IUserLogInInput = Input<typeof UserLogInInput>

export type OUserLogInInput = Output<typeof UserLogInInput>
