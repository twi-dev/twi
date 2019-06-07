import bind from "core/graphql/bindResolver"
import mail from "core/mail/transport"

import User from "db/model/User"
import Session from "db/model/Session"
import Token from "db/model/EmailConfirmationToken"

async function authSignUp({args, ctx}) {
  const user = await User.createOne(args.user)

  const token = await Token.createOne({userId: user.id, email: user.email})
  const link = `https://lib.octetstream.me/auth/confirm/${token.hash}`

  await mail.send({
    to: user.email,
    subject: "Welcome to the Twilight's Library",
    html: `
      Follow this link to activate your account: <a href="${link}">${link}</a>
    `
  })

  return Session.sign({userId: user.id, client: ctx.client})
}

export default bind(authSignUp)
