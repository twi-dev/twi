import type {AuthResponse, AuthErrorResponse} from "./AuthResponse.js"

export const isAuthErrorResponse = (
  value: AuthResponse
): value is AuthErrorResponse => value.ok === false
