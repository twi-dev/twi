import {z} from "zod"

import {UserRecord} from "./UserRecord.js"
import {UserStats} from "./UserStats.js"

export const UserOutput = UserRecord.merge(UserStats)

export type IUserOutput = z.input<typeof UserOutput>

export type OUserOutput = z.output<typeof UserOutput>
