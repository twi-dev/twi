import {AbilityBuilder as Builder} from "@casl/ability"

import isEmpty from "lodash/isEmpty"

import User from "model/User"

const {statuses, roles} = User

const getCommonUserAbilities = user => Builder.define((allow, forbid) => {
  allow("read", "all")

  if (isEmpty(user)) {
    return undefined
  }

  // Unactivated, banned and suspended users can only read things.
  if (user.status !== statuses.activated) {
    forbid("manage", "all")
  }

  // Super user can do anything with everything.
  if (user.role === roles.super) {
    allow("manage", "all")
  }
})

export default getCommonUserAbilities
