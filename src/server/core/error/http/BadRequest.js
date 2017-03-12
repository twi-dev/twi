import HttpException from "./HttpException"

class BadRequestException extends HttpException {
  constructor(message) {
    super(message)

    this.name = "BadRequestException"
    this.status = 400
    this.message = message
  }
}

export default BadRequestException
