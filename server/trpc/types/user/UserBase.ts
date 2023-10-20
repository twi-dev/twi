import type {Input, Output} from "valibot"
import {object} from "valibot"

import {UserLogin} from "./UserLogin.js"

export const UserBase = object({
  login: UserLogin
})

export type IUserBase = Input<typeof UserBase>

export type OUserBase = Output<typeof UserBase>
