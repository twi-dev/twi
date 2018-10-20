import validate from "validate.js"

import {after} from "core/database/middleware"

const rules = {
  email: {
    presence: true,
    email: true
  },
  login: {
    presence: true,
    exclusion: {
      within: ["su", "admin", "moderator", "mod", "support"],
      message: "You cannot use reserved words in your nickname."
    },
    format: {
      pattern: /^[a-z0-9-_.]+$/i
    }
  }
}

const checkUser = user => validate.async(user, rules)

module.exports = {
  checkUser: after.validate(checkUser)
}
