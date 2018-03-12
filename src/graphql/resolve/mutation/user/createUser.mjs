import User from "database/model/User"
import Session from "database/model/Session"

async function createUser(_, {user}, ctx) {
  // TODO: Add an email verification using redis and an email service.
  await User.createOne(user)

  return Session.sign(user, ctx)
}

export default createUser
