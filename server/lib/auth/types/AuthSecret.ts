import {string, minLength} from "valibot"

export const AuthSecret = string([minLength(21)])
