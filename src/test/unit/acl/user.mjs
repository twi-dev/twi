import test from "ava"

import getAbilities from "acl/user"
import UserModel from "db/model/User"

const {roles, statuses} = UserModel

class User {
  constructor({role, status} = {}) {
    this.role = role ?? roles.user
    this.status = status ?? statuses.unactivated
  }
}

test("Allow to read by default", t => {
  const acl = getAbilities(new User({}))

  t.true(acl.can("read", new User({})))
})

test("Forbid to manage by default", t => {
  const acl = getAbilities(new User({}))

  t.true(acl.cannot("manage", new User({})))
})

test("Allow super to manage users", t => {
  const acl = getAbilities(new User({role: roles.super}))

  t.true(acl.can("manage", new User({})))
})

test("Forbid super to remove their own account", t => {
  const acl = getAbilities(new User({role: roles.super}))

  t.true(acl.cannot("delete", new User({role: roles.super})))
})
