import bind from "server/lib/helper/graphql/normalizeParams"
import waterfall from "server/lib/helper/array/runWaterfall"
import NotFound from "server/lib/error/http/NotFound"
import db from "server/lib/db/connection"

import User from "server/model/User"
import File from "server/model/File"

const include = [{model: File, as: "avatar"}]

/**
 * @param {Object} params
 * @param {import("koa").Context} params.ctx
 *
 * @return {Promise<number>}
 */
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

export default avatarRemove |> bind
