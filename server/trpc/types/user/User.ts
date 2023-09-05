import {z} from "zod"

import {UserBase} from "./UserBase.js"
import {UserDisplayName} from "./UserDisplayName.js"

export const User = UserBase.extend({
  displayName: UserDisplayName.nullish()
})

export type IUser = z.input<typeof User>

export type OUser = z.output<typeof User>
