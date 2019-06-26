import User from "db/model/User"

import auth from "core/auth/checkUser"
import bind from "core/graphql/bindResolver"
import BadRequest from "core/error/http/BadRequest"

async function updateAvatar({args, ctx}) {
  const user = await User.findById(ctx.state.user.id)

  if (!user) {
    throw new BadRequest("There's no such user.")
  }

  return user.updateAvatar(args.avatar)
}

export default updateAvatar |> bind |> auth
