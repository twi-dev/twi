import {route, methods} from "system/helper/decorator/controller"

class HomeController {
  @route("/", methods.get)
  async actionIndex(ctx) {
    await ctx.render("/index")
  }
}

export default HomeController
