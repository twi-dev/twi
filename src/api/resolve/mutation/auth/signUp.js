import {format} from "url"

import omit from "lodash/omit"

import {add} from "lib/auth/tokens"

import concat from "lib/helper/string/concatFromArray"
import bind from "lib/helper/graphql/normalizeParams"
import mail from "lib/mail/transport"
import config from "lib/base/config"
import db from "lib/db/connection"

import Session from "model/Session"
import User from "model/User"

const {client} = config

const signUp = ({args, ctx}) => db.transaction(async transaction => {
  const user = await User.create(args.user, {transaction})

  const token = await add(user)

  const link = format({
    host: client.url, pathname: concat(["/auth", "confirm", token], "/")
  })

  await mail.send({
    to: user.email,
    subject: "Welcome to the Twilight's Library",
    html: `
      Follow this link to activate your account: <a href="${link}">${link}</a>
    `
  })

  return Session.sign({
    client: ctx.state.client,
    user: omit(user.toJSON(), "password")
  }, {transaction})
})

export default bind(signUp)
