import bind from "lib/helper/graphql/normalizeParams"
import waterfall from "lib/helper/array/runWaterfall"
import NotFound from "lib/error/http/NotFound"
import auth from "lib/auth/checkUser"
import db from "lib/db/connection"

import User from "model/User"
import File from "model/File"

const include = [{model: File, as: "avatar"}]

const avatarRemove = ({ctx}) => db.transaction(async transaction => {
  const {user: viewer} = ctx.state

  const user = await User.findByPk(viewer.id, {include, transaction})

  if (!user) {
    throw new NotFound("Can't find a user.")
  }

  return waterfall([
    () => user.avatar.destroy({transaction}),

    () => user.avatarRemove({transaction}),

    () => user.avatar.id
  ])
})

export default avatarRemove |> auth |> bind
