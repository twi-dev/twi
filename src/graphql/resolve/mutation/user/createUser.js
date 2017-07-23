import User from "database/model/User"

async function createUser(_, {user}) {
  const createdUser = await User.create({...user})

  // TODO: Add an email verification using redis and mail service.
  return createdUser.toJS()
}

export default createUser
