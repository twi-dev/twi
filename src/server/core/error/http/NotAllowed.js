import HttpException from "./HttpException"

class NotAllowedException extends HttpException {
  constructor(message) {
    super(message)

    this.name = "NotAllowedException"
    this.status = 404
    this.message = message
  }
}

export default NotAllowedException
