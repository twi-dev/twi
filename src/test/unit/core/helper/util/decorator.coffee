test = require "ava"

decorator = require "../../../../../core/helper/util/decorator"

test.beforeEach (t) ->
  decorateGreetMethod = (target, key, descriptor) ->
    greet = descriptor.value

    descriptor.value = decoratedGreet = ->
      "#{do greet} Method sucessfully decorated. Area is clear."

  t.context.decorateGreetMethod = decorateGreetMethod

test "Should have all the following methods", (t) ->
  t.plan 3

  t.is typeof decorator.decorateMethods, "function"
  t.is typeof decorator.decorateMethod, "function"
  t.is typeof decorator.decorateFunc, "function"

  await return

test "Should dectorate method with decorateGreetMethod", (t) ->
  {decorateGreetMethod} = t.context
  {decorateMethods, decorateMethod} = decorator

  class SomeClass
    greet: -> "Hello, world!"

  SomeClass = decorateMethods SomeClass, [
    decorateMethod decorateGreetMethod, "greet"
  ]

  instance = new SomeClass

  t.is instance.greet.name, "decoratedGreet"
  t.is (do instance.greet), "
    Hello, world! Method sucessfully decorated. Area is clear.
  "

  do t.pass
  await return
