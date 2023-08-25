import type {AuthOkResponse, AuthResponse} from "./AuthResponse.js"

export const isAuthOkResponse = (
  value: AuthResponse
): value is AuthOkResponse => value.ok === true
