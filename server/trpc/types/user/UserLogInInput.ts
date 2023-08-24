import {z} from "zod"

import {UserBase} from "./UserBase.js"

export const UserLogInInput = UserBase.extend({
  password: z.string().min(5)
})

export type IUserLogInInput = z.input<typeof UserLogInInput>

export type OUserLogInInput = z.output<typeof UserLogInInput>

