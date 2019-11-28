import bind from "lib/helper/graphql/normalizeParams"
import serial from "lib/helper/array/runSerial"
import NotFound from "lib/error/http/NotFound"
import auth from "lib/auth/checkUser"
import conn from "lib/db/connection"

import User from "model/User"
import File from "model/File"

const include = [{model: File, as: "avatar"}]

const avatarRemove = ({ctx}) => conn.transaction(async transaction => {
  const {user: viewer} = ctx.state

  const user = await User.findByPk(viewer.id, {include, transaction})

  if (!user) {
    throw new NotFound("Can't find a user.")
  }

  return serial([
    () => user.avatar.destroy({transaction}),

    () => user.avatarRemove({transaction}),

    () => user.avatar.id
  ])
})

export default avatarRemove |> auth |> bind
