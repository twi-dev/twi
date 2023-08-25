import {z} from "zod"

export const AuthSecret = z.string().min(21)
