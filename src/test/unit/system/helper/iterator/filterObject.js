import test from "ava"

import isFunction from "lodash/isFunction"

import filter from "system/helper/iterator/sync/filterObject"

test("Should should be a function", t => {
  t.plan(1)

  t.true(isFunction(filter))
})

test("Should return expected object due to filter predicate", t => {
  t.plan(1)

  const obj = {
    foo: "Foo",
    bar: "Bar",
    baz: "Baz"
  }

  const predicate = val => val.toLowerCase() !== "bar"

  t.deepEqual(filter(obj, predicate), {
    foo: "Foo",
    baz: "Baz"
  })
})
