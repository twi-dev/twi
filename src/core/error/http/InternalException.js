import HttpException from "./HttpException"

class InternalServerException extends HttpException {
  constructor(message) {
    super(message, "HTTP_INTERNAL_SERVER_EXCEPTION")

    this.status = 500
  }
}

export default InternalServerException
