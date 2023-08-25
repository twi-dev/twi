import {z} from "zod"

export const AuthOrigin = z.string().url()
