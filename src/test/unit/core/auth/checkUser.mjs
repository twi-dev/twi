import test from "ava"

import isFunction from "lodash/isFunction"

import Unauthorized from "core/error/http/Unauthorized"
import checkUser from "core/auth/checkUser"

test("Should return a function when message is string", t => {
  t.plan(1)

  const res = checkUser("Some random error message.")

  t.true(isFunction(res))
})

test(
  "Should return an async function when target passed instead of message",
  t => {
    t.plan(2)

    const res = checkUser(async () => {})

    t.true(isFunction(res))
    t.is(res.constructor.name, "AsyncFunction")
  }
)

test("Should not throw an error when user is authenticated", async t => {
  t.plan(1)

  const fakeResolver = checkUser(() => {})

  const trap = () => fakeResolver({
    ctx: {
      state: {
        user: {}
      },

      isAuthenticated: () => true,
      isUnauthenticated: () => false
    }
  })

  await t.notThrows(trap())
})

test("Should throw an error when user is unauthenticated", async t => {
  t.plan(3)

  const fakeResolver = checkUser("Some error message.")(() => {})

  const trap = () => fakeResolver({
    ctx: {
      state: {
        user: undefined
      },

      isAuthenticated: () => false,
      isUnauthenticated: () => true
    }
  })

  const err = await t.throws(trap())

  t.true(err instanceof Unauthorized)
  t.is(err.message, "Some error message.")
})

test("Should throw an error with default message", async t => {
  t.plan(3)

  const fakeResolver = checkUser(() => {})

  const trap = () => fakeResolver({
    ctx: {
      state: {
        user: {}
      },

      isAuthenticated: () => false,
      isUnauthenticated: () => true
    }
  })

  const err = await t.throws(trap())

  t.true(err instanceof Unauthorized)
  t.is(
    err.message,
    "Seems like you're have not authorized. " +
    "Please, check your credentials and try again."
  )
})

test("Should throw a TypeError when no arguments passed", t => {
  t.plan(3)

  const trap = () => checkUser()

  const err = t.throws(trap)

  t.true(err instanceof TypeError)
  t.is(err.message, "Target function is required.")
})
