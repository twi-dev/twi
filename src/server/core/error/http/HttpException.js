import Exception from "../common/Exception"

class HttpException extends Exception {
  constructor(message) {
    super(message, "E_HTTP")

    this.name = "HttpException"
    this.status = 500
    this.message = message
  }
}

export default HttpException
