import route, {methods} from "server/core/helper/decorator/route"

const {post} = methods

class AuthController {
  @route("/login", post)
  async actionLogin(ctx) {
    ctx.body = "Not Implemented"
  }
}

export default AuthController
