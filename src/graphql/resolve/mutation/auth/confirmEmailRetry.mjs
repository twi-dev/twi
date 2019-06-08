import bind from "core/graphql/bindResolver"
import auth from "core/auth/checkUser"
import mail from "core/mail/transport"

import User from "db/model/User"
import Token from "db/model/EmailConfirmationToken"

async function confirmEmailRetry({ctx}) {
  const user = await User.findById(ctx.state.user.id)

  const token = await Token.createOne({userId: user.id, email: user.email})
  const link = `https://lib.octetstream.me/auth/confirm/${token.hash}`

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
