import type {Input, Output} from "valibot"
import {object, nullish} from "valibot"

import {UserBase} from "./UserBase.js"
import {UserDisplayName} from "./UserDisplayName.js"

export const User = object({
  ...UserBase.entries,

  displayName: nullish(UserDisplayName)
})

export type IUser = Input<typeof User>

export type OUser = Output<typeof User>
