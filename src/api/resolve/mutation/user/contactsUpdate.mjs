import bind from "lib/helper/graphql/normalizeParams"
import NotFound from "lib/error/http/NotFound"
import auth from "lib/auth/checkUser"
import db from "lib/db/connection"

import User from "model/User"
import Contacts from "model/Contacts"

const include = [{model: Contacts, as: "contacts"}]

const avatarRemove = ({args, ctx}) => db.transaction(async transaction => {
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
