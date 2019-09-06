import test from "ava"

import User from "model/User"
import getAbilities from "acl/common"

test("Allow to read by default", t => {
  const acl = getAbilities()

  t.true(acl.can("read", "Something"))
})

test("Forbid to manage by default", t => {
  const acl = getAbilities()

  t.true(acl.can("read", "Something"))
})

test("Allow super user to manage everything", t => {
  const acl = getAbilities({role: User.roles.super})

  t.true(acl.can("manage", "Something"))
})

test("Forbid banned user to manage something", t => {
  const acl = getAbilities({status: User.statuses.super})

  t.true(acl.cannot("manage", "Something"))
})
