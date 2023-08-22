import {z} from "zod"

export const User = z.string().nonempty("User name required") // TODO: Improve user validation
