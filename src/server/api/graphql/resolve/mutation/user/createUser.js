import User from "server/api/model/User"

async function createUser(_, args) {
  const user = await User.createUser({...args})

  // TODO: Add an email verification using redis and mail service.
  return user.toJS()
}

export default createUser
