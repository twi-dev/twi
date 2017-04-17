import test from "ava"
import {spy} from "sinon"

import isFunction from "lodash/isFunction"

import pfy from "system/helper/util/promisify"

test.beforeEach(t => {
  const noop = reject => function noop(val, cb) {
    isFunction(val) && ([cb, val] = [val, null])

    if (reject) {
      return cb(new Error(
        "This function has been rejected cuz \"reject\" parameter is truthy."
      ))
    }

    return cb(null, val)
  }

  const getLastElement = arr => [...arr].pop()

  t.context = {
    getLastElement,
    noop
  }
})

test("Should be a function", t => {
  t.plan(1)

  t.true(isFunction(pfy))
})

test("Should return a promisify function", t => {
  t.plan(2)

  const noop = pfy(t.context.noop())

  t.true(isFunction(noop))
  t.true(noop() instanceof Promise)
})

test("Should pass a \"fulfill\" function as last parameter", async t => {
  t.plan(3)

  const getLastElement = t.context.getLastElement
  const noop = spy(t.context.noop())
  const callee = pfy(noop)

  await callee("I beat Twilight Sparkle and all I got was this lousy t-shirt.")

  const arg = getLastElement(noop.args[0])

  t.true(isFunction(arg), "Argument \"fulfill\" should be a function.")
  t.truthy(arg.name, "Argument \"fulfill\" can't be anonymous.")
  t.is(arg.name, "fulfill", "Argument \"fulfill\" should have a valid name.")
})

test("Should resolve given value from a function", async t => {
  t.plan(1)

  const val = "It was a dark and stormy night"

  const noop = pfy(t.context.noop())

  const res = await noop(val)

  t.is(res, val)
})

test("Should thow an error when \"reject\" argument is truthy.", async t => {
  t.plan(1)

  const noop = pfy(t.context.noop(true))

  await t.throws(noop(),
    "This function has been rejected cuz \"reject\" parameter is truthy."
  )
})
