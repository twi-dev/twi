import User from "database/model/User"
import Session from "database/model/Session"

async function createUser(params) {
  await User.createOne(params)

  return Session.sign(params)
}

export default createUser
