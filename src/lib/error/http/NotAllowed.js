import HttpException from "./HttpException"

class NotAllowedException extends HttpException {
  constructor(message) {
    super(message, "HTTP_NOT_ALLOWED_EXCEPTION")

    this.status = 405
  }
}

export default NotAllowedException
