{action} = require "mobx"
{dms, dm} = require "decorator"

isFunction = require "lodash/isFunction"
isPlainObject = require "lodash/isPlainObject"

###
# Note: This class is extendable. So, you should use it *only* with your stores
#
# class MyAwesomeStore extends Store
###
class Store
  ###
  # Update given text field
  #
  # @param Event
  ###
  updateTextField: ({target: {name, value}}) =>
    this[name] = value if name of this and not isFunction name

  send: (endpoint, method, body) =>
    [body, method] = [method, body] if isPlainObject

    return await fetch "#{endpoint}", {method, body}

module.exports = dms Store, [
  dm action, "updateTextField"
  dm action, "send"
]
