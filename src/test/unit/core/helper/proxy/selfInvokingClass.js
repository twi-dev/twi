import test from "ava"
import sinon from "sinon"

import proxy from "core/helper/decorator/proxy"
import apply from "core/helper/proxy/selfInvokingClass"

test("Should create allow to invoke ES6 class just like a function.", t => {
  t.plan(1)

  @proxy({apply})
  class NoopClass {}

  const obj = NoopClass()

  t.true(obj instanceof NoopClass)
})

test("Should correctly pass arguments to target constructor", t => {
  t.plan(2)

  const NoopClass = sinon.spy(proxy({apply})(class NoopClass {}))

  NoopClass("foo", ["bar", "baz"])


  t.true(NoopClass.called)

  const [actualArgs] = NoopClass.args

  t.deepEqual(actualArgs, ["foo", ["bar", "baz"]])
})
