import HttpException from "./HttpException"

class ForbiddenException extends HttpException {
  constructor(message) {
    super(message)

    this.name = "ForbiddenException"
    this.status = 403
    this.message = message
  }
}

export default ForbiddenException
