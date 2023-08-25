interface AuthBaseResponse {
  /**
   * HTTP response status code
   */
  status: number
}

export interface AuthOkResponse extends AuthBaseResponse {
  /**
   * Indicates whether operation was successful
   */
  ok: true

  /**
   * A URL user should be redirected to
   */
  url: string
}

export interface AuthErrorResponse extends AuthBaseResponse {
  /**
   * Indicates whether operation was successful
   */
  ok: false

  /**
   * Will be different error codes,
   * depending on the type of error.
   */
  error: string
}

export type AuthResponse = AuthOkResponse | AuthErrorResponse
