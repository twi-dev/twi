import {format} from "url"

import {add} from "lib/auth/tokens"

import concat from "lib/helper/string/concatFromArray"
import bind from "lib/helper/graphql/normalizeParams"
import auth from "lib/auth/checkUser"
import mail from "lib/mail/transport"
import config from "lib/base/config"

import User from "model/User"

const {server} = config

/**
 * @param {Object} params
 * @param {import("koa").Context} params.ctx
 *
 * @return {Promise<string>}
 */
async function confirmEmailRetry({ctx}) {
  const user = await User.findByPk(ctx.state.user.id)
  const token = await add(user)

  const link = format({
    host: server.url,
    pathname: concat(["/auth", "confirm", token.hash], "/")
  })

  await mail.send({
    to: user.email,
    subject: "Welcome to the Twilight's Library",
    html: `
      Follow this link to activate your account: <a href="${link}">${link}</a>
    `
  })

  return token
}

export default confirmEmailRetry |> auth |> bind
