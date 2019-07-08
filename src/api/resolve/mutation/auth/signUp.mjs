import {format} from "url"
import {join} from "path"

import omit from "lodash/omit"

import config from "core/base/config"
import mail from "core/mail/transport"
import bind from "core/helper/graphql/bindResolver"

import Token from "db/model/EmailConfirmationToken"
import Session from "db/model/Session"
import User from "db/model/User"

const {server} = config

async function signUp({args, ctx}) {
  const user = await User.create(args.user)

  const token = await Token.create({userId: user.id, email: user.email})
  const link = format({
    host: server.url, pathname: join("/auth", "confirm", token.hash)
  })

  await mail.send({
    to: user.email,
    subject: "Welcome to the Twilight's Library",
    html: `
      Follow this link to activate your account: <a href="${link}">${link}</a>
    `
  })

  return Session.sign({user: omit(user, "password"), client: ctx.state.client})
}

export default bind(signUp)
