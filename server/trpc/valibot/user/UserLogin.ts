import {string, regex, minLength} from "valibot"
import type {Input, Output} from "valibot"

export const LOGIN_PATTERN = /^[a-z0-9._-]+$/i

export const UserLogin = string([minLength(1), regex(LOGIN_PATTERN)])

export type IUserLogin = Input<typeof UserLogin>

export type OUserLogin = Output<typeof UserLogin>
