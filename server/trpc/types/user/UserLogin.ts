import {z} from "zod"

export const LOGIN_PATTERN = /^[a-z0-9._-]+$/i

export const UserLogin = z.string().min(1).regex(LOGIN_PATTERN)

export type IUserLogin = z.input<typeof UserLogin>

export type OUserLogin = z.output<typeof UserLogin>
