import User from "database/model/User"

async function createUser(_, {user}) {
  user = await User.createOne(user)

  // TODO: Add an email verification using redis and an email service.
  return user
}

export default createUser
