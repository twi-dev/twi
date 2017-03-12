import test from "ava"

import isFunction from "lodash/isFunction"

import checkCtorCall from "server/core/helper/fallback/checkCtorCall"

test("Should be a function", t => {
  t.plan(1)

  t.true(isFunction(checkCtorCall))
})

test("Should throw a TypeError on illegal ctor invokation", t => {
  t.plan(1)

  function NoopCtor() {
    checkCtorCall(NoopCtor, this)
  }

  const callee = () => NoopCtor()

  t.throws(callee, "Class constructor NoopCtor cannot be invoked without 'new'")
})
