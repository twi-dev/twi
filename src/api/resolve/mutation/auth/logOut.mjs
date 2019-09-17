import Unauthorized from "core/error/http/Unauthorized"
import bind from "core/helper/graphql/normalizeParams"
import auth from "core/auth/checkUser"
import conn from "core/db/connection"

import User from "model/User"
import Session from "model/Session"

const include = [{model: User, as: "user", required: true}]

const logOut = ({args, ctx}) => conn.transaction(async transaction => {
  const {user: viewer} = ctx.state
  const {refreshToken} = args

  const session = await Session.findByToken(refreshToken, {
    transaction, include
  })

  if (!session || session.user.id !== viewer.id) {
    throw new Unauthorized(
      "Bad refreshToken signature: Check your credentials and try again."
    )
  }

  return session.destroy({transaction}).then(() => refreshToken)
})

export default logOut |> auth |> bind
