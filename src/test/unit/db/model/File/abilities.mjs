import test from "ava"

import getAbilities from "db/model/File/abilities"

class File {
  constructor({userId} = {}) {
    this.userId = userId
  }
}

test("Allows to read file", t => {
  const acl = getAbilities({})

  t.true(acl.can("read", new File()))
})

test("Allows to manage file", t => {
  const userId = 1

  const acl = getAbilities({userId})

  t.true(acl.can("read", new File({userId})))
})

test("Disallow to manage file by non-creator", t => {
  const acl = getAbilities({userId: 1})

  t.true(acl.cannot("manage", new File({userId: 2})))
})
