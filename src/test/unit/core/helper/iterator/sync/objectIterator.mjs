import test from "ava"

import iterator from "core/helper/iterator/sync/objectIterator"

test("Should immediately done the iteration when no object given", t => {
  t.plan(1)

  t.true(iterator().values().next().done)
})

test("Should immediately done the iteration when object is empty", t => {
  t.plan(1)

  t.true(iterator({}).values().next().done)
})

test("Should return just a value when no \"entries\" flag given", t => {
  t.plan(1)

  t.is(iterator({someKey: "some value"}).values().next().value, "some value")
})

test("objectIterator.entries should return an object entries", t => {
  t.plan(1)

  const expected = ["someKey", "some value"]

  const actual = iterator({someKey: "some value"}).entries().next().value

  t.deepEqual(actual, expected)
})

test("Should throw a TypeError when non-object value passed.", t => {
  t.plan(3)

  const trap = () => iterator(42)

  const err = t.throws(trap)

  t.true(err instanceof TypeError)
  t.is(err.message, "Iterable must be an object.")
})
