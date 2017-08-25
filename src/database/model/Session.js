import {createModel, Model} from "core/database"
// import {sign} from "jsonwebtoken"

import parser from "ua-parser-js"

@createModel
class Session extends Model {
  static async createOne({email, password}, ctx) {
    // const ip = ctx.ip

    const ua = parser(ctx.get("user-agent"))

    console.log(`${ua.browser.name} (${ua.os.name})`)

    return {
      access: "foo",
      refresh: "bar"
    }
  }
}

export default Session
