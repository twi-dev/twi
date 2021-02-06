import {AbilityBuilder as Builder} from "@casl/ability"

import User from "server/model/User"

const {roles} = User

const getUserAbilities = user => Builder.define((allow, forbid) => {
  allow("read", User)

  // Moderators must be able to update users status, so they can ban/unban them
  if (user.role === roles.moderator) {
    allow("update", User, ["status"], {role: roles.user})
  }

  // Admins can update user's name, status and role
  if (user.role === roles.admin) {
    allow(
      ["update", "delete"],

      User,

      ["name", "status", "role"],

      // Admins can update users with following roles:
      {role: {$in: [roles.user, roles.moderator, roles.tech, roles.support]}}
    )
  }

  // Application owner can do everything, but removing their account.
  if (user.role === roles.super) {
    allow("manage", User)
    forbid("delete", User, {role: roles.super})
  }
})

export default getUserAbilities
