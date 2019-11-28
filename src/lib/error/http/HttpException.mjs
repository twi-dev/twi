import Exception from "lib/error/base/Exception"

class HttpException extends Exception {
  constructor(message, code = "HTTP_EXCEPTION") {
    super(message, code)
  }
}

export default HttpException
