import {string, email, object} from "valibot"
import type {Input, Output} from "valibot"

import {UserOutput} from "./UserOutput.js"

const UserSessionOutput = object({
  ...UserOutput.object,

  email: string([email()])
})

export type IUserSessionOutput = Input<typeof UserSessionOutput>

export type OUserSessionOutput = Output<typeof UserSessionOutput>
