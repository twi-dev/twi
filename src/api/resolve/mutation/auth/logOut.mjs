import BadRequest from "core/error/http/BadRequest"
import bind from "core/graphql/bindResolver"
import auth from "core/auth/checkUser"

import User from "db/model/User"
import Session from "db/model/Session"

async function logOut({args, ctx}) {
  const session = await Session.findByToken(args.refreshToken)
  const user = await User.findById(session.userId)

  if (!user || ctx.state.user.id !== String(session.userId)) {
    throw new BadRequest("Can't find a user associated with given token.")
  }

  return session.remove().then(() => args.refreshToken)
}

export default logOut |> bind |> auth
