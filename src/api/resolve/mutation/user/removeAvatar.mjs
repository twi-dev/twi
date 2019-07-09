import User from "db/model/User"
import File from "db/model/File"

import auth from "core/auth/checkUser"
import select from "core/helper/graphql/select"
import serial from "core/helper/array/runSerial"
import bind from "core/helper/graphql/bindResolver"

import BadRequest from "core/error/http/BadRequest"

async function removeAvatar({ctx, node}) {
  const user = await User.findById(ctx.state.user.id)

  if (!user) {
    throw new BadRequest("There's no such user.")
  }

  return serial([
    () => File.unlink(user.avatar),

    () => user.removeAvatart(),

    () => (User.findById(user.id) |> select(node))
  ])
}

export default removeAvatar |> bind |> auth
