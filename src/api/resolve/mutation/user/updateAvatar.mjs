import User from "db/model/User"
import File from "db/model/File"

import auth from "core/auth/checkUser"
import select from "core/helper/graphql/select"
import serial from "core/helper/array/runSerial"
import bind from "core/helper/graphql/bindResolver"

import BadRequest from "core/error/http/BadRequest"

async function updateAvatar({args, ctx}) {
  const user = await User.findById(ctx.state.user.id)

  if (!user) {
    throw new BadRequest("There's no such user.")
  }

  const file = await File.findById(user.image)

  if (!file) {
    throw new BadRequest("Can't find such file.")
  }

  return serial([
    () => file.updateContent(args.image),

    () => user.updateAvatar(file.id),

    () => User.findById(user.id)
  ])
}

export default updateAvatar |> bind |> auth
