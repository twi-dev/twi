class Exception extends Error {
  constructor(message, code = "EXCEPTION") {
    super(message)

    this.code = code
    this.status = 500
    this.name = this.constructor.name

    Error.captureStackTrace(this, Exception)
  }

  get statusCode() {
    return this.status
  }
}

export default Exception
