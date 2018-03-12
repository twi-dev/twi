import Exception from "../base/Exception"

class HttpException extends Exception {
  constructor(message, code = "HTTP_EXCEPTION") {
    super(message, code)
  }
}

export default HttpException
