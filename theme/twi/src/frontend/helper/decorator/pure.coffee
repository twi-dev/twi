{Component, createElement} = require "react"
{observer} = require "mobx-react"

isFunction = require "lodash/isFunction"
isEmpty = require "lodash/isEmpty"
isArray = require "lodash/isArray"

###
# List of allowed React lifecycle methods
###
allowed = [
  # React
  "componentWillMount"
  "componentDidMount"
  "componentWillReceiveProps"
  "componentWillUpdate"
  "shouldComponentUpdate"
  "componentWillUpdate"
  "componentDidUpdate"
  "componentWillUnmount"

  # MobX-React
  "componentWillReact"
]

###
# Wrap your functional components as stateful component
#   to use React lifecycle methods
#
# @param function|array methods – list of React lifecycle methods that you need
#
# @return Pure <: React.Component
#
# @throw TypeError
# @throw Error
###
pure = (methods) ->
  methods = [methods] if isFunction methods

  if isEmpty methods
    throw new TypeError "Methods cannot be empty."

  unless isArray methods
    throw new TypeError "
      Methods should be passed as array of functions or as single function.
    "

  return wrapFunctionalComponent = (Target) ->
    if isEmpty Target.name
      throw new Error "Anonymous components are not allowed."

    unless isFunction Target
      throw new TypeError "Target component should be a function."

    # Component wrapper
    class Pure extends Component
      render: ->
        createElement Target, @props, @props.children

    for m in methods
      unless m.name in allowed
        throw new Error "Allowed only React lifecycle methods."

      Pure::[m.name] = m

    Pure.displayName = "#{Pure.name}(#{Target.name})"

    return Pure

module.exports = pure
