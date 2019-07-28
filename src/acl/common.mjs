import {AbilityBuilder as Builder} from "@casl/ability"

import isEmpty from "lodash/isEmpty"

import User from "db/model/User"

const {statuses, roles} = User

const getCommonUserAbilities = user => Builder.define((allow, forbid) => {
  allow("read", "all")

  if (isEmpty(user)) {
    return undefined
  }

  if (user.status !== statuses.activated) {
    forbid("manage", "all")
  }

  if (user.role === roles.super) {
    allow("manage", "all")
  }
})

export default getCommonUserAbilities
