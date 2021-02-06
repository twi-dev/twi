import bind from "server/lib/helper/graphql/normalizeParams"
import waterfall from "server/lib/helper/array/runWaterfall"
import NotFound from "server/lib/error/http/NotFound"
import db from "server/lib/db/connection"

import User from "server/model/User"
import File from "server/model/File"

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

export default avatarUpdate |> bind
