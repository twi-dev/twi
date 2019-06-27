import {format} from "url"
import {join} from "path"

import config from "core/base/config"
import auth from "core/auth/checkUser"
import mail from "core/mail/transport"
import bind from "core/graphql/bindResolver"

import Token from "db/model/EmailConfirmationToken"
import User from "db/model/User"

const {server} = config

async function confirmEmailRetry({ctx}) {
  const user = await User.findById(ctx.state.user.id)

  const token = await Token.create({userId: user.id, email: user.email})
  const link = format({
    host: server.url, pathname: join("auth", "confirm", token.hash)
  })

  await mail.send({
    to: user.email,
    subject: "Welcome to the Twilight's Library",
    html: `
      Follow this link to activate your account: <a href="${link}">${link}</a>
    `
  })

  return Token
}

export default confirmEmailRetry |> bind |> auth
