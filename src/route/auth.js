// DEPRECATED

import route from "core/helper/decorator/controller"

class AuthController {
  @route.post("/login")
  async actionLogin(ctx) {
    ctx.body = {}
  }
}

export default AuthController
