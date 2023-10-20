import type {Input, Output} from "valibot"
import {string, minLength} from "valibot"

export const UserDisplayName = string([minLength(1)])

export type IUserDisplayName = Input<typeof UserDisplayName>

export type OUserDisplayName = Output<typeof UserDisplayName>
