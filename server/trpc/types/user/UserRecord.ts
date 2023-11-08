import type {Input, Output} from "valibot"
import {object} from "valibot"

import {RecordSoft} from "../common/RecordSoft.js"

import {UserBase} from "./UserBase.js"

export const UserRecord = object({...RecordSoft.entries, ...UserBase.entries})

export type IUserRecord = Input<typeof UserRecord>

export type OUserRecord = Output<typeof UserRecord>
