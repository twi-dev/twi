import test from "ava"

import {compare} from "bcryptjs"
import {internet} from "faker"
import {Document} from "mongoose"

import isPlainObject from "lodash/isPlainObject"

import {createConnection, closeConnection} from "test/helper/database"

import User from "database/model/User"

test.before(createConnection)

test.beforeEach(t => {
  t.context.login = internet.userName()
  t.context.email = internet.email()
  t.context.password = internet.password()
})

test("Should create user with given params.", async t => {
  t.plan(3)

  const login = t.context.login
  const email = t.context.email
  const password = t.context.password

  const user = await User.createOne({login, email, password})

  t.is(user.login, login)
  t.is(user.email, email)
  t.true(await compare(password, user.password))
})

test("Should always create a USER even if \"role\" passed", async t => {
  t.plan(4)

  const login = t.context.login
  const email = t.context.email
  const password = t.context.password

  const role = User.roles.su

  const user = await User.createOne({login, email, password, role})

  t.false(user.isSu)
  t.not(user.role, "SU")

  t.true(user.isUser)
  t.is(user.role, "USER")
})

test(
  "Should also create UNACTIVATED user even if \"status\" passed",
  async t => {
    t.plan(4)

    const login = t.context.login
    const email = t.context.email
    const password = t.context.password

    const status = User.statuses.activated

    const user = await User.createOne({login, email, password, status})

    t.false(user.isActivated)
    t.not(user.status, "ACTIVATED")

    t.true(user.isUnactivated)
    t.is(user.status, "UNACTIVATED")
  }
)

test("Created user should be returned as plain object by default", async t => {
  t.plan(1)

  const login = t.context.login
  const email = t.context.email
  const password = t.context.password

  const user = await User.createOne({login, email, password})

  t.true(isPlainObject(user))
})

test(
  "Created user should be returned as a Document when option toJS is false",
  async t => {
    t.plan(1)

    const login = t.context.login
    const email = t.context.email
    const password = t.context.password

    const user = await User.createOne({login, email, password}, {
      toJS: false
    })

    t.true(user instanceof Document)
  }
)

test("Should throw a TypeError on invocation witout any arguments", async t => {
  t.plan(3)

  const err = await t.throws(User.createOne())

  t.true(err instanceof TypeError)
  t.is(
    err.message,
    "User data information should be passed as plain JavaScript object."
  )
})

test("Should throw a TypeError when user data object is empty", async t => {
  t.plan(3)

  const err = await t.throws(User.createOne({}))

  t.true(err instanceof TypeError)
  t.is(err.message, "User information cannot be empty.")
})

test("Should throw an error on User.createMany invocation", async t => {
  t.plan(1)

  await t.throws(
    User.createMany(),
    "This method is not allowed in this class. Use User.createOne instead."
  )
})

test.after(closeConnection)
