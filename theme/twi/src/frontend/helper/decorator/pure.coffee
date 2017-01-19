{Component, createElement} = require "react"
isFunction = require "lodash/isFunction"
isEmpty = require "lodash/isEmpty"

###
# List of allowed React lifecycle methods
###
allowed = [
  "componentWillMount"
  "componentDidMount"
  "componentWillReceiveProps"
  "componentWillUpdate"
  "shouldComponentUpdate"
  "componentWillUpdate"
  "componentDidUpdate"
  "componentWillUnmount"
]

###
#
###
pure = (Target, methods) ->
  if isEmpty Target.name
    throw new Error "Anonymous components are not allowed."

  unless isFunction
    throw new TypeError "Target component should be a function."

  methods = [methods] if isFunction methods

  class Pure extends Component
    constructor: (props, context, updater) ->
      super props, context, updater

      @displayName = "#{@constructor.name}(#{Target.name})"

    render: -> createElement Target, @props

    for m in methods
      unless m.name in allowed
        throw new Error "Allowed only React lifecycle methods."

      Pure::[m.name] = m

  return Pure

module.exports = pure
