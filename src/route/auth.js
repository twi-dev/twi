import passport from "koa-passport"

import route from "core/helper/decorator/controller"

class AuthController {
  @route.post("/login", passport.authenticate("local"))
  async actionLogin(ctx) {
    ctx.body = {}
  }
}

export default AuthController
