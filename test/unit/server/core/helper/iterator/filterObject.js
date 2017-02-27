import test from "ava"

import isFunction from "lodash/isFunction"

import filter from "server/core/helper/iterator/filterObject"

test("Should should be a function", async t => {
  t.plan(1)

  t.true(isFunction(filter))
})

// test("Should return expected object due to filter predicate", async t => {
//   const predicate = (val, key, obj) => {}
// })
