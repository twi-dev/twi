{getOwnPropertyDescriptor, defineProperty} = Object

isFunction = require "lodash/isFunction"
isString = require "lodash/isString"
isArray = require "lodash/isArray"

###
# Decorate given function using given decorator
#
# @alias df
#
# @param function decorator
# @param function func
#
# @return function - decorated function
###
decorateFunc = (decorator, func) -> decorator func

###
# Decorate  given methods of given class
#
# @alias dms
#
# @param Function ctor
# @param array methods - array of methods to decorate.
#   Should be wrapped into decorateMethod helper.
#
# @return Function - class with decorated methods
###
decorateMethods = (ctor, methods) ->
  unless isFunction ctor
    throw new TypeError "Constructor should be a function."

  unless isArray methods
    throw new TypeError "Methods should be an array."

  m ctor for m in methods

  return ctor

###
# Decorate method by his name
#
# @alias dm
#
# @param function decorator
# @param string name
###
decorateMethod = (decotator, name) -> (ctor) ->
  unless isFunction decotator
    throw new TypeError "Decorator should be a function."

  unless name or isString name
    throw new TypeError "Name should be a string and cannot be empty."

  descriptor = getOwnPropertyDescriptor ctor.prototype, name
  decotator ctor.prototype, name, descriptor

  defineProperty ctor.prototype, name, descriptor
  return

module.exports = {
  decorateMethods
  decorateMethod
  decorateFunc

  # Aliases
  dms: decorateMethods
  dm: decorateMethod
  df: decorateFunc
}
