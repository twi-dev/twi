import bind from "core/graphql/bindResolver"
import mail from "core/mail/transport"

import User from "db/model/User"
import Session from "db/model/Session"
import Token from "db/model/EmailConfirmationToken"

async function signUp({args, ctx}) {
  const user = await User.create(args.user)

  const token = await Token.create({userId: user.id, email: user.email})
  const link = `https://stories.octetstream.me/auth/confirm/${token.hash}`

  await mail.send({
    to: user.email,
    subject: "Welcome to the Twilight's Library",
    html: `
      Follow this link to activate your account: <a href="${link}">${link}</a>
    `
  })

  return Session.sign({userId: user.id, client: ctx.state.client})
}

export default bind(signUp)
