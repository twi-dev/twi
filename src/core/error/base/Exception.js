class Exception extends Error {
  constructor(message, code = "EXCEPTION") {
    super(message)

    this.code = code
    this.name = this.constructor.name

    Error.captureStackTrace(this, Exception)
  }
}

export default Exception
