import {internet} from "faker"
import nanoid from "test/helper/util/nanoid"

import User from "database/model/User"

/**
 * Create random user and assign to the AVA test context
 */
async function createUser(t) {
  const login = `${internet.userName()}${nanoid()}`
  const email = `${nanoid()}${internet.email()}`
  const password = internet.password()

  const args = {user: {login, email, password}}

  const user = await User.createOne({args})

  t.context.user = user
}

export default createUser
