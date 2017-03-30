import moment from "moment"

import model from "server/core/base/model"

const User = model.User

async function createUser(_, {login, email, password}) {
  const user = await (new User({
    login,
    email,
    password,
    role: 4,
    avatar: null,
    registeredAt: moment()
  }))

  return {...user}
}

export {
  createUser
}
