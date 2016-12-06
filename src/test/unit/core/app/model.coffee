test = require "ava"

{readdir} = require "promise-fs"
{isPlainObject} = require "lodash"
{define} = models = require "../../../../core/app/model"

test "Module should return a plain object", (t) ->
  t.plan 1

  t.true isPlainObject(models)

  await return

test "Should be a function", (t) ->
  t.plan 1

  t.is typeof define, "function"

  await return

test "Should throw a TypeError when \"name\" is empty or not a string", (t) ->
  t.plan 1

  t.throws (-> do define), "Schema name should be a string and cannot be empty."

  await return

test "Should throw a TypeError when \"schema\" is empty not a function", (t) ->
  t.plan 1

  t.throws (-> define "foo"), "Schema \"foo\" should be a function."

  await return
