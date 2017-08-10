import test from "ava"

import {createConnection, closeConnection} from "test/helper/database"

import createUser from "test/unit/database/model/__hook__/createUser"

import Story from "database/model/Story"

test.before(createConnection)

test.beforeEach(createUser)

test("Should throw an error when no author's ID given", async t => {
  t.plan(3)

  const err = await t.throws(Story.createOne())

  t.true(err instanceof TypeError)
  t.is(err.message, "Can't create a story: No author's ID given.")
})

test("Should throw a TypeError when no story information given", async t => {
  t.plan(3)

  const err = await t.throws(Story.createOne(t.context.user.id))

  t.true(err instanceof TypeError)
  t.is(err.message, "Story data should be passed as plain JavaScript object.")
})

test("Should throw a TypeError when no story information is empty", async t => {
  t.plan(3)

  const err = await t.throws(Story.createOne(t.context.user.id, {}))

  t.true(err instanceof TypeError)
  t.is(err.message, "Story information is required.")
})

test.after(closeConnection)
