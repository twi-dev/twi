import {internet} from "faker"

import User from "database/model/User"

/**
 * Create random user and assign to the AVA test context
 */
async function createUser(t) {
  const login = internet.userName()
  const email = internet.email()
  const password = internet.password()

  const user = await User.createOne({login, email, password})

  t.context.user = user
}

export default createUser
