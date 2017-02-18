import Exception from "../common/Exception"

class HttpException extends Exception {
  constructor(message, name, status) {
    super(message, "E_HTTP")

    this.message = message
    this.name = name || "HttpException"
    this.status = status || 500
  }
}

export default HttpException
