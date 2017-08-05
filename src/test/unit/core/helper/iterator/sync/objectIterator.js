import test from "ava"

import iterator from "core/helper/iterator/sync/objectIterator"

test("Should throw a TypeError when non-object value passed.", t => {
  t.plan(3)

  const trap = () => iterator(42).next()

  const err = t.throws(trap)

  t.true(err instanceof TypeError)
  t.is(err.message, "Allowed only objects as iterable.")
})
