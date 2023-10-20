import {omit, object, nullish} from "valibot"
import type {Input, Output} from "valibot"

import {FileInput} from "../common/FileInput.js"

import {User} from "./User.js"

export const UserUpdateInput = object({
  ...omit(User, ["login"]).object,

  avatar: nullish(FileInput)
})

export type IUserUpdateInput = Input<typeof UserUpdateInput>

export type OUserUpdateInput = Output<typeof UserUpdateInput>
