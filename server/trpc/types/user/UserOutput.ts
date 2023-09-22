import {z} from "zod"

import {ImageOutput} from "../common/ImageOutput.js"

import {UserDisplayName} from "./UserDisplayName.js"
import {UserRecord} from "./UserRecord.js"

export const UserOutput = UserRecord.extend({
  displayName: UserDisplayName.nullable(),
  avatar: ImageOutput.nullable()
})

export type IUserOutput = z.input<typeof UserOutput>

export type OUserOutput = z.output<typeof UserOutput>
