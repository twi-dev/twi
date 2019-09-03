import Unauthorized from "core/error/http/Unauthorized"
import bind from "core/helper/graphql/normalizeParams"

import Session from "model/Session"

async function logOut({args, ctx}) {
  const {user: viewer} = ctx.state
  const {refreshToken} = args

  const session = await Session.findByToken(refreshToken)

  const user = await session.getUser()

  if (user.id !== viewer.id) {
    throw new Unauthorized(
      "Bad refreshToken signature: Check your credentials and try again."
    )
  }

  return session.destroy().then(() => refreshToken)
}

export default bind(logOut)
