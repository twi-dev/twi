import test from "ava"

import {permittedFieldsOf} from "@casl/ability/extra"

import Collaborator from "db/model/Collaborator"
import User from "db/model/User"

import getAbilities from "acl/story"

class Story {
  constructor({userId} = {}) {
    this.userId = userId
  }
}

test("Allow anyone to read by default", t => {
  const acl = getAbilities({})

  t.true(acl.can("read", new Story()))
})

test("Forbid anyone to manage by default", t => {
  const acl = getAbilities({})

  t.true(acl.cannot("manage", new Story()))
})

test("Allow creator to manage own story", t => {
  const id = 1

  const acl = getAbilities({user: {id}})

  t.true(acl.can("manage", new Story({userId: id})))
})

test("Allow moderator to update", t => {
  const acl = getAbilities({user: {role: User.roles.moderator}})

  t.true(acl.can("update", new Story()))
})

test("Forbid moderator from managing", t => {
  const acl = getAbilities({user: {role: User.roles.moderator}})

  t.true(acl.can("manage", new Story()))
})

test("Restrict moderator on updating only spcefic fields", t => {
  const acl = getAbilities({user: {role: User.roles.moderator, id: 1}})

  const actual = permittedFieldsOf(acl, "update", new Story({userId: 2}))

  t.deepEqual(actual, ["title", "description", "genres", "characters", "cover"])
})

test("Allow moderator to update anything in its own story", t => {
  const id = 1

  const acl = getAbilities({user: {role: User.roles.moderator, id}})

  const actual = permittedFieldsOf(acl, "update", new Story({userId: id}))

  t.deepEqual(actual, [])
})

test("Allow writer to update stories", t => {
  const acl = getAbilities({
    user: {}, collaborator: {role: Collaborator.roles.writer}
  })

  t.true(acl.can("update", new Story({userId: 1})))
})

test("Forbid writer to update specific fields", t => {
  const acl = getAbilities({
    user: {}, collaborator: {role: Collaborator.roles.writer}
  })

  const story = new Story({userId: 1})

  t.true(acl.cannot("update", story, "title"))
  t.true(acl.cannot("update", story, "description"))
  t.true(acl.cannot("update", story, "cover"))
})
