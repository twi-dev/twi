import bind from "lib/helper/graphql/normalizeParams"
import serial from "lib/helper/array/runSerial"
import NotFound from "lib/error/http/NotFound"
import auth from "lib/auth/checkUser"
import conn from "lib/db/connection"

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
