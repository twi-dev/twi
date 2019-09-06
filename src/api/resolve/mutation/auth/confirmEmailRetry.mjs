import {format} from "url"

import {add} from "core/auth/tokens"

import config from "core/base/config"
import auth from "core/auth/checkUser"
import mail from "core/mail/transport"
import concat from "core/helper/string/concatFromArray"
import bind from "core/helper/graphql/normalizeParams"

import User from "model/User"

const {server} = config

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
