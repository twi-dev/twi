class Exception extends Error {
  /**
   * @param {string} message
   * @param {string} [code = "EXCEPTION"]
   */
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
