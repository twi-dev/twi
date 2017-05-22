import User from "server/api/model/User"

async function getUser(_, {login}) {
  const user = await User.findOne({login})

  return user.toJS()
}

export default getUser
