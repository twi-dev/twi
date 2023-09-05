import {z} from "zod"

export const UserDisplayName = z.string().nonempty()
