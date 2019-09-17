import waterfall from "core/helper/array/runWaterfall"
import bind from "core/helper/graphql/normalizeParams"
import NotFound from "core/error/http/NotFound"
import auth from "core/auth/checkUser"
import conn from "core/db/connection"

import User from "model/User"
import File from "model/File"

const include = [{model: File, as: "avatar"}]

const avatarRemove = ({ctx}) => conn.transaction(async transaction => {
  const {user: viewer} = ctx.state

  const user = await User.findByPk(viewer.id, {include, transaction})

  if (!user) {
    throw new NotFound("Can't find requested user.")
  }

  return waterfall([
    () => user.avatar.destroy({transaction}),

    () => user.avatarRemove({transaction}),

    () => user.avatar.id
  ])
})

export default avatarRemove |> auth |> bind
