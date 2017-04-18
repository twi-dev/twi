import {route, methods} from "system/helper/decorator/controller"

const post = methods.post

class AuthController {
  @route("/login", post)
  async actionLogin(ctx) {
    ctx.body = "Not Implemented"
  }
}

export default AuthController
