import {format} from "url"

import omit from "lodash/omit"

import {add} from "core/auth/tokens"

import concat from "core/helper/string/concatFromArray"
import bind from "core/helper/graphql/normalizeParams"
import mail from "core/mail/transport"
import config from "core/base/config"
import conn from "core/db/connection"

import Session from "model/Session"
import User from "model/User"

const {server} = config

const signUp = ({args, ctx}) => conn.transaction(async t => {
  const {client} = ctx.state

  const user = await User.create(args.user, {transaction: t})

  const token = await add(user)

  const link = format({
    host: server.url, pathname: concat(["/auth", "confirm", token], "/")
  })

  await mail.send({
    to: user.email,
    subject: "Welcome to the Twilight's Library",
    html: `
      Follow this link to activate your account: <a href="${link}">${link}</a>
    `
  })

  return Session.sign({
    client, user: omit(user.toJSON(), "password")
  }, {transaction: t})
})

export default bind(signUp)
