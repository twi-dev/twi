import test from "ava"

import isFunction from "lodash/isFunction"

import checkCtorCall from "system/helper/util/checkCtorCall"

test("Should be a function", t => {
  t.plan(1)

  t.true(isFunction(checkCtorCall))
})

test("Should throw a TypeError on illegal ctor invoсation", t => {
  t.plan(1)

  function Character({name, race, friends} = {}) {
    checkCtorCall(Character, this)

    this.name = name
    this.race = race
    this.friends = friends
  }

  const trap = () => Character()

  t.throws(trap, "Class constructor Character cannot be invoked without 'new'")
})
