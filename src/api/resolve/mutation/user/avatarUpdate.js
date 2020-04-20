import bind from "lib/helper/graphql/normalizeParams"
import waterfall from "lib/helper/array/runWaterfall"
import NotFound from "lib/error/http/NotFound"
import auth from "lib/auth/checkUser"
import db from "lib/db/connection"

import User from "model/User"
import File from "model/File"

const include = [{model: File, as: "avatar"}]

/**
 * @param {Object} params
 * @param {{image: Object<string, any>}} params.args
 * @param {import("koa").Context} params.ctx
 *
 * @return {Promise<File>}
 */
const avatarUpdate = ({args, ctx}) => db.transaction(async transaction => {
  const {user: viewer} = ctx.state
  const {image} = args

  const user = await User.findByPk(viewer.id, {include, transaction})

  if (!user) {
    throw new NotFound("Can't find a user.")
  }

  const file = await File.create(image, {transaction})

  return waterfall([
    () => user.avatar.destroy({transaction}),

    () => user.setAvatar(file.id, {transaction}),

    () => file
  ])
})

export default avatarUpdate |> auth |> bind
