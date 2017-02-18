class Exception extends Error {
  constructor(message, code) {
    super(message)

    this.code = code || "E_EXCEPTION"

    Error.captureStackTrace(this, Error)
  }
}

export default Exception
