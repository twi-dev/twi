import HttpException from "./HttpException"

class UnauthorizedException extends HttpException {
  constructor(message) {
    super(message)

    this.name = "UnauthorizedException"
    this.status = 401
    this.message = message
  }
}

export default UnauthorizedException
