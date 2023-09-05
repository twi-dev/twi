import {z} from "zod"

import {RecordSoft} from "../common/RecordSoft.js"

import {UserNode} from "./UserNode.js"
import {UserStats} from "./UserStats.js"
import {User} from "./User.js"

export const UserRecord = RecordSoft
  .merge(UserNode)
  .merge(User)
  .merge(UserStats)

export type IUserRecord = z.input<typeof UserRecord>

export type OUserRecord = z.output<typeof UserRecord>
