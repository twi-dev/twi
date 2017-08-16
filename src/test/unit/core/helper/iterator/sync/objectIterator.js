import test from "ava"

import iterator from "core/helper/iterator/sync/objectIterator"

test("Should immediately done the iteration when no object given", t => {
  t.plan(1)

  t.true(iterator().next().done)
})

test("Should return just a value when no \"entries\" flag given", t => {
  t.plan(1)

  t.is(iterator({someKey: "some value"}).next().value, "some value")
})

test("Should return entries array when \"entries\" flag is set to true", t => {
  t.plan(1)

  const expected = ["someKey", "some value"]

  const actual = iterator({someKey: "some value"}, true).next().value

  t.deepEqual(actual, expected)
})

test("Should throw a TypeError when non-object value passed.", t => {
  t.plan(3)

  const trap = () => iterator(42).next()

  const err = t.throws(trap)

  t.true(err instanceof TypeError)
  t.is(err.message, "Allowed only objects as iterable.")
})
