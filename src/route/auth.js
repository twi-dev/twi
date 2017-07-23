import {route, methods} from "core/helper/decorator/controller"

const post = methods.post

class AuthController {
  @route("/login", post)
  async actionLogin(ctx) {
    ctx.body = "Not Implemented"
  }
}

export default AuthController
