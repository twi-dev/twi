test = require "ava"
isFunction = require "lodash/isFunction"

pure = require "frontend/helper/decorator/pure"

test.beforeEach (t) ->
  componentWillMount = -> do @props.callback

  t.context = {
    componentWillMount
  }

test "Should be a function", (t) ->
  t.plan 1

  t.true isFunction pure

test "Pure decorator should return a function when method passed", (t) ->
  t.plan 1

  {componentWillMount} = t.context

  t.true isFunction pure componentWillMount

test "Should throw a TypeError when call pure without any arguments", (t) ->
  t.plan 1

  t.throws (do -> do pure), "Methods cannot be empty."
