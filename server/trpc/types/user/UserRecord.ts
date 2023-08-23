import {z} from "zod"

import {RecordSoft} from "../common/RecordSoft.js"

import {UserNode} from "./UserNode.js"

export const UserRecord = RecordSoft.merge(UserNode)

export type IUserRecord = z.input<typeof UserRecord>

export type OUserRecord = z.output<typeof UserRecord>
