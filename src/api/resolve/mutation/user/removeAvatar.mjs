import User from "db/model/User"
import File from "db/model/File"

import auth from "core/auth/checkUser"
import bind from "core/graphql/bindResolver"
import BadRequest from "core/error/http/BadRequest"

async function removeAvatar({ctx}) {
  const user = await User.findById(ctx.state.user.id)

  if (!user) {
    throw new BadRequest("There's no such user.")
  }

  return File.unlink(user.avatar)
    .then(() => user.removeAvatar())
}

export default removeAvatar |> bind |> auth
