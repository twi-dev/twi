import bind from "core/helper/graphql/normalizeParams"
import NotFound from "core/error/http/NotFound"
import auth from "core/auth/checkUser"
import conn from "core/db/connection"

import User from "model/User"

const passwordUpdate = ({args, ctx}) => conn.transaction(async transaction => {
  const {user: viewer} = ctx.state
  const {password} = args

  const user = await User.findByPk(viewer.id, {transaction})

  if (!user) {
    throw new NotFound("Can't find requested user.")
  }

  return user.updatePassword(password.old, password.new, {transaction})
    .then(() => user.reload({transaction}))
})

export default passwordUpdate |> auth |> bind
