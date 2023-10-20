import {string, optional, minLength} from "valibot"

export const Host = optional(string([minLength(1)]), "localhost") // TODO: Improve host validation
