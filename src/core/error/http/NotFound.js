import HttpException from "./HttpException"

class NotFoundException extends HttpException {
  constructor(message) {
    super(message, "HTTP_NOT_FOUND_EXCEPTION")

    this.status = 404
  }
}

export default NotFoundException
