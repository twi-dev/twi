import test from "ava"

import isListOf from "system/helper/typechecker/isListOf"

test(
  "Should return true when each element of given list is a valid type",
  t => {
    const list = ["earch pony", "unicorn", "pegasus", "alicorn"]

    const predicate = val => typeof val === "string"

    t.true(isListOf(list, predicate))
  }
)

test(
  "Should return false when one (or more than one) element in given list " +
  "have an unexpected type",
  t => {
    t.plan(1)

    const list = [
      "string",
      null, // This is the wrong type due to predicate condition
      "another string"
    ]

    const predicate = val => typeof val === "string"

    t.false(isListOf(list, predicate))
  }
)

test("Should throw a TypeError when the first argument is not an array", t => {
  t.plan(3)

  const trap = () => isListOf({})

  const err = t.throws(trap)

  t.true(err instanceof TypeError)
  t.is(
    err.message,
    "Expected an array as \"list\" argument, " +
    "but given value is type of Object."
  )
})

test("Should throw a TypeError when predicate is not a function", t => {
  t.plan(3)

  const trap = () => isListOf([])

  const err = t.throws(trap)

  t.true(err instanceof TypeError)
  t.is(err.message, "Predicate should be a function, not type of Undefined.")
})
