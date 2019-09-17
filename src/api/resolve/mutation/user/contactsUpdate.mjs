import bind from "core/helper/graphql/normalizeParams"
import NotFound from "core/error/http/NotFound"
import auth from "core/auth/checkUser"
import conn from "core/db/connection"

import User from "model/User"
import Contacts from "model/Contacts"

const include = [{model: Contacts, as: "contacts"}]

const avatarRemove = ({args, ctx}) => conn.transaction(async transaction => {
  const {user: viewer} = ctx.state
  const {contacts} = args

  const user = await User.findByPk(viewer.id, {include, transaction})

  if (!user) {
    throw new NotFound("Can't find a user.")
  }

  return user.contacts.update(contacts, {transaction})
    .then(() => user.reload({transaction}))
})

export default avatarRemove |> auth |> bind
