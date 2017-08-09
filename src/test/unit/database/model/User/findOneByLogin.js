import test from "ava"

import {internet} from "faker"

import {createConnection, closeConnection} from "test/helper/database"

import User from "database/model/User"
import NotFound from "core/error/http/NotFound"

test.before(createConnection)

test.beforeEach(async t => {
  const login = internet.userName()
  const email = internet.email()
  const password = internet.password()

  await User.createOne({login, email, password})

  t.context.login = login
})

test("Should just return requested user", async t => {
  t.plan(1)

  const user = await User.findOneByLogin(t.context.login)

  t.is(user.login, t.context.login)
})

test("Should throw a NotFound error when user is not found", async t => {
  t.plan(4)

  const err = await t.throws(User.findOneByLogin("OctetStream"))

  t.true(err instanceof NotFound)
  t.is(err.message, "Can't find user with login OctetStream.")
  t.is(err.status, 404)
})

test.after(closeConnection)

