import {join} from "path"

import User from "db/model/User"
import File from "db/model/File"

import auth from "core/auth/checkUser"
import select from "core/helper/graphql/select"
import serial from "core/helper/array/runSerial"
import bind from "core/helper/graphql/bindResolver"

import BadRequest from "core/error/http/BadRequest"

async function updateAvatar({args, ctx, node}) {
  const user = await User.findById(ctx.state.user.id)

  if (!user) {
    throw new BadRequest("There's no such user.")
  }

  const file = await File.findById(user.image)

  if (!file) {
    throw new BadRequest("Can't find such file.")
  }

  const {filename, ...image} = args.image

  return serial([
    () => file.updateContent({...image, filename: join("avatar", filename)}),

    () => user.updateAvatar(file.id),

    () => (User.findById(user.id) |> select(node))
  ])
}

export default updateAvatar |> bind |> auth
