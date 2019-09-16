import bind from "core/helper/graphql/normalizeParams"
import NotFound from "core/error/http/NotFound"
import auth from "core/auth/checkUser"

import User from "model/User"

async function avatarRemove({ctx}) {
  const {user} = ctx.state

  const found = await User.findByPk(user.id)

  if (!user) {
    throw new NotFound("Can't find requested user.")
  }

  return found.avatarRemove().then(() => found.reload())
}

export default avatarRemove |> auth |> bind
