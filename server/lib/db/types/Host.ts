import {z} from "zod"

export const Host = z.string().default("localhost") // TODO: Improve host validation
