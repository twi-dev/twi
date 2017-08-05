import User from "database/model/User"

async function findUserByLogin(_, {login}) {
  const user = await User.getByLogin(login)

  return user
}

export default findUserByLogin
