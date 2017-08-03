import test from "ava"

import {compare} from "bcryptjs"

import createConnection from "test/helper/database"

import User from "database/model/User"

test.before(async () => await createConnection())

test("Should create a user with given params", async t => {
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
