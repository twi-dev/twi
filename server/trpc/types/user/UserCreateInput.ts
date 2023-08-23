import {z} from "zod"

import {UserBase} from "./UserBase.js"

export const UserCreateInput = UserBase.extend({
  email: z.string().email(),
  password: z.string().min(5)
})

export type IUserCreateInput = z.input<typeof UserCreateInput>

export type OUserCreateInput = z.output<typeof UserCreateInput>
