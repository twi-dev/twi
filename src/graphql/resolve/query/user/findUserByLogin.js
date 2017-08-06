import User from "database/model/User"

async function findUserByLogin(_, {login}) {
  const user = await User.findOneByLogin(login)

  return user
}

export default findUserByLogin
