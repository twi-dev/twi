import test from "ava"

import {compare} from "bcryptjs"

import createConnection from "test/helper/database"

import User from "database/model/User"
import NotFound from "core/error/http/NotFound"

test.before(async () => await createConnection())

test("User.createOne should create a user with given params", async t => {
  t.plan(3)

  const user = await User.createOne({
    login: "TwilightSparkle",
    email: "twi@golden-oak.eq",
    password: "purplesmart123"
  })

  t.is(user.login, "TwilightSparkle")
  t.is(user.email, "twi@golden-oak.eq")
  t.true(await compare("purplesmart123", user.password))
})

test("User.createOne should return correct default fields", async t => {
  t.plan(4)

  const user = await User.createOne({
    login: "Foo",
    email: "foo@bar.co",
    password: "123"
  })

  t.is(user.role, "user")
  t.true(user.isUser)

  t.is(user.status, "unactivated")
  t.true(user.isUnactivated)
})

test("User.createOne should allow to create only regular user", async t => {
  t.plan(4)

  const user = await User.createOne({
    login: "Bar",
    email: "bar@tarr.co",
    password: "123",
    role: User.roles.su // Should be replaced with User.roles.user
  })

  t.false(user.isSu, "User created with User.createOne should not be a SU")

  t.false(
    user.isAdmin, "User created with User.createOne should not be an ADMIN"
  )

  t.false(
    user.isMod, "User created with User.createOne should not be a MOD"
  )

  t.true(user.isUser)
})

test("Should throw an error on User.createMany invocation", async t => {
  t.plan(1)

  await t.throws(
    User.createMany(),
    "This method is not allowed in this class. Use User.createOne instead."
  )
})

test("User.getByLogin should just return requested user", async t => {
  t.plan(1)

  await User.createOne({
    login: "SomeUser",
    email: "someuser@someemail.co",
    password: "123"
  })

  const user = await User.getByLogin("SomeUser")

  t.is(user.login, "SomeUser")
})

test(
  "User.getByLogin should throw a NotFound error when user is not found",
  async t => {
    t.plan(4)

    const err = await t.throws(User.getByLogin("OctetStream"))

    t.true(err instanceof NotFound)
    t.is(err.message, "Can't find user with login /^OctetStream$/i.")
    t.is(err.status, 404)
  }
)
