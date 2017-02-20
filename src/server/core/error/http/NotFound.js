import HttpException from "./HttpException"

class NotFoundException extends HttpException {
  constructor(message) {
    super(message)

    this.name = "NotFoundException"
    this.status = 404
    this.message = message
  }
}

export default NotFoundException
