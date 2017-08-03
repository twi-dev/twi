import test from "ava"

import isFunction from "lodash/isFunction"

import Forbidden from "core/error/http/Forbidden"
import checkUser from "core/helper/decorator/checkUser"

test("Should return a function when message is string", t => {
  t.plan(2)

  const res = checkUser("Some random error message.")

  t.true(isFunction(res))
  t.is(res.constructor.name, "Function")
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

  const trap = () => fakeResolver(null, null, {
    state: {
      user: {}
    },

    isAuthenticated() {
      return true
    }
  })

  await t.notThrows(trap())
})

test("Should throw an error when user is unauthenticated", async t => {
  t.plan(3)

  const fakeResolver = checkUser("Some error message.")(() => {})

  const trap = () => fakeResolver(null, null, {
    state: {
      user: undefined
    },

    isAuthenticated() {
      return false
    }
  })

  const err = await t.throws(trap())

  t.true(err instanceof Forbidden)
  t.is(err.message, "Some error message.")
})

test("Should throw an error with default message", async t => {
  t.plan(3)

  const fakeResolver = checkUser(() => {})

  const trap = () => fakeResolver(null, null, {
    state: {
      user: {}
    },

    isAuthenticated() {
      return false
    }
  })

  const err = await t.throws(trap())

  t.true(err instanceof Forbidden)
  t.is(err.message, "Access denied.")
})
