import User from "server/api/database/model/User"

async function getUser(_, {login}) {
  const user = await User.getByLogin(login)

  return user ? user.toJS() : null
}

export default getUser
