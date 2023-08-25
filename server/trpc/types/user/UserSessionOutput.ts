import {z} from "zod"

import {UserOutput} from "./UserOutput.js"

export const UserSessionOutput = UserOutput.extend({
  email: z.string().email()
})

export type IUserSessionOutput = z.input<typeof UserSessionOutput>

export type OUserSessionOutput = z.output<typeof UserSessionOutput>
