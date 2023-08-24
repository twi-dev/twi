import {z} from "zod"

import {UserLogInInput} from "./UserLogInInput.js"

export const UserSignUpInput = UserLogInInput.extend({
  email: z.string().email(),
})

export type IUserSignUpInput = z.input<typeof UserSignUpInput>

export type OUserSignUpInput = z.output<typeof UserSignUpInput>
