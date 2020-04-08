import HttpException from "./HttpException"

class UnauthorizedException extends HttpException {
  constructor(message) {
    super(message, "UNAUTHORIZED_EXCEPTION")

    this.status = 401
  }
}

export default UnauthorizedException
