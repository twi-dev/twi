import bind from "core/helper/graphql/normalizeParams"
import serial from "core/helper/array/runSerial"
import NotFound from "core/error/http/NotFound"
import auth from "core/auth/checkUser"
import conn from "core/db/connection"

import User from "model/User"
import File from "model/File"

const include = [{model: File, as: "avatar"}]

const avatarUpdate = ({args, ctx}) => conn.transaction(async transaction => {
  const {user: viewer} = ctx.state
  const {image} = args

  const user = await User.findByPk(viewer.id, {include, transaction})

  if (!user) {
    throw new NotFound("Can't find a user.")
  }

  const file = await File.create(image, {transaction})

  return serial([
    () => user.avatar.destroy({transaction}),

    () => user.setAvatar(file.id, {transaction}),

    () => file
  ])
})

export default avatarUpdate |> auth |> bind
