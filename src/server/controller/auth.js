import {router, route, methods} from "server/core/helper/decorator/controller"

const {post} = methods

// @router
class AuthController {
  @route("/login", post)
  async actionLogin(ctx) {
    ctx.body = "Not Implemented"
  }
}

export default AuthController
