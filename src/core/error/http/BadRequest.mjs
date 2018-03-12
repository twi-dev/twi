import HttpException from "./HttpException"

class BadRequestException extends HttpException {
  constructor(message) {
    super(message, "HTTP_BAD_REQUEST_EXCEPTION")

    this.status = 400
  }
}

export default BadRequestException
