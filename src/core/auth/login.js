import {Strategy as LocalStrategy} from "passport-local"
import {compare} from "bcryptjs"

import User from "database/model/User"

import NotFound from "core/error/http/NotFound"

async function auth(username, password) {
  let user = null
  try {
    user = await User.findOneByUsername(username)
  } catch (err) {
    if (!(err instanceof NotFound)) {
      throw err
    }

    return false
  }

  if (!(await compare(password, user.password))) {
    return false
  }

  delete user.password

  return user
}

const verify = (username, password, cb) => (
  auth(username, password).then(res => cb(null, res)).catch(cb)
)

const login = new LocalStrategy(verify)

export default login
