class Exception extends Error {
  constructor(message, code) {
    super(message)

    this.code = code || "E_EXCEPTION"
    this.name = "Exception"

    Error.captureStackTrace(this, Exception)
  }
}

export default Exception
