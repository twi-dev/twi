import bind from "server/lib/helper/graphql/normalizeParams"
import NotFound from "server/lib/error/http/NotFound"
import db from "server/lib/db/connection"

import User from "server/model/User"

const passwordUpdate = ({args, ctx}) => db.transaction(async transaction => {
  const {user: viewer} = ctx.state
  const {password} = args

  const user = await User.findByPk(viewer.id, {transaction})

  if (!user) {
    throw new NotFound("Can't find requested user.")
  }

  return user.updatePassword(password.old, password.new, {transaction})
    .then(() => user.reload({transaction}))
})

export default passwordUpdate |> bind
