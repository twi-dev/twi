import type {Input, Output} from "valibot"
import {object} from "valibot"

import {RecordSoft} from "../common/RecordSoft.js"

import {UserBase} from "./UserBase.js"

export const UserRecord = object({...RecordSoft.object, ...UserBase.object})

export type IUserRecord = Input<typeof UserRecord>

export type OUserRecord = Output<typeof UserRecord>
