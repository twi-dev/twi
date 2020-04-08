import test from "ava"

import {permittedFieldsOf} from "@casl/ability/extra"

import getAbilities from "acl/user"
import UserModel from "model/User"

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

test("Allow moderator to update user", t => {
  const acl = getAbilities(new User({role: roles.moderator}))

  t.true(acl.can("update", new User({})))
})

test("Restrict moderator on updating specific fields", t => {
  const acl = getAbilities(new User({role: roles.moderator}))

  const actual = permittedFieldsOf(acl, "update", new User({}))

  t.deepEqual(actual, ["status"])
})

test("Forbid moderator to update moderator", t => {
  const acl = getAbilities(new User({role: roles.moderator}))

  t.true(acl.cannot("update", new User({role: roles.moderator})))
})

test("Forbid moderator to update admin", t => {
  const acl = getAbilities(new User({role: roles.moderator}))

  t.true(acl.cannot("update", new User({role: roles.admin})))
})

test("Forbid moderator to update super", t => {
  const acl = getAbilities(new User({role: roles.moderator}))

  t.true(acl.cannot("update", new User({role: roles.super})))
})

test("Forbid moderator to update support", t => {
  const acl = getAbilities(new User({role: roles.moderator}))

  t.true(acl.cannot("update", new User({role: roles.support})))
})

test("Forbid moderator to update tech", t => {
  const acl = getAbilities(new User({role: roles.moderator}))

  t.true(acl.cannot("update", new User({role: roles.tech})))
})

test("Forbid moderator to update developer", t => {
  const acl = getAbilities(new User({role: roles.moderator}))

  t.true(acl.cannot("update", new User({role: roles.developer})))
})

test("Allow admin to update user", t => {
  const acl = getAbilities(new User({role: roles.admin}))

  t.true(acl.can("update", new User({})))
})

test("Allow admin to update moderator", t => {
  const acl = getAbilities(new User({role: roles.admin}))

  t.true(acl.can("update", new User({role: roles.moderator})))
})

test("Allow admin to update tech", t => {
  const acl = getAbilities(new User({role: roles.admin}))

  t.true(acl.can("update", new User({role: roles.tech})))
})

test("Allow admin to update support", t => {
  const acl = getAbilities(new User({role: roles.admin}))

  t.true(acl.can("update", new User({role: roles.support})))
})

test("Allow admin to delete moderator", t => {
  const acl = getAbilities(new User({role: roles.admin}))

  t.true(acl.can("delete", new User({role: roles.moderator})))
})

test("Allow admin to delete tech", t => {
  const acl = getAbilities(new User({role: roles.admin}))

  t.true(acl.can("delete", new User({role: roles.tech})))
})

test("Allow admin to delete support", t => {
  const acl = getAbilities(new User({role: roles.admin}))

  t.true(acl.can("delete", new User({role: roles.support})))
})

test("Restrict admin on updating specific fields", t => {
  const acl = getAbilities(new User({role: roles.admin}))

  const actual = permittedFieldsOf(acl, "update", new User({}))

  t.deepEqual(actual, ["name", "status", "role"])
})

test("Allow super to manage users", t => {
  const acl = getAbilities(new User({role: roles.super}))

  t.true(acl.can("manage", new User({})))
})

test("Forbid super to remove their own account", t => {
  const acl = getAbilities(new User({role: roles.super}))

  t.true(acl.cannot("delete", new User({role: roles.super})))
})
