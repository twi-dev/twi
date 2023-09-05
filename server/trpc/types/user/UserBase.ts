import {z} from "zod"

import {UserLogin} from "./UserLogin.js"

export const UserBase = z.object({
  displayName: z.string().nullish(),
  login: UserLogin
})

export type IUserBase = z.input<typeof UserBase>

export type OUserBase = z.output<typeof UserBase>
