import Unauthorized from "core/error/http/Unauthorized"
import bind from "core/helper/graphql/normalizeParams"
import auth from "core/auth/checkUser"
import conn from "core/db/connection"

import User from "model/User"
import Session from "model/Session"

const logOut = ({args, ctx}) => conn.transaction(async t => {
  const {user: viewer} = ctx.state
  const {refreshToken} = args

  const session = await Session.findByToken(refreshToken, {
    transaction: t, include: [User]
  })

  if (!session || session.User.id !== viewer.id) {
    throw new Unauthorized(
      "Bad refreshToken signature: Check your credentials and try again."
    )
  }

  return session.destroy({transaction: t}).then(() => refreshToken)
})

export default logOut |> auth |> bind
