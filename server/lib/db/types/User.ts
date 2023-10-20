import {string, minLength} from "valibot"

export const User = string([minLength(1, "User name required")]) // TODO: Improve user validation
