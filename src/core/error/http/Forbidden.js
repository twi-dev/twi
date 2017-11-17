import HttpException from "./HttpException"

class ForbiddenException extends HttpException {
  constructor(message) {
    super(message, "HTTP_FORBIDDEN_EXCEPTION")

    this.status = 403
  }
}

export default ForbiddenException
