import {AbilityBuilder as Builder} from "@casl/ability"

import User from "db/model/User"

const getCommonUserAbilities = user => Builder.define((allow, forbid) => {
  allow("read", "all")

  if (user.status === User.statuses.banned) {
    forbid("manage", "all")
  }

  if (user.role === User.roles.super) {
    allow("manage", "all")
  }
})

export default getCommonUserAbilities
