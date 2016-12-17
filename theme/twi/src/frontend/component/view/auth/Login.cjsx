{Component} = React = require "react"

class Login extends Component
  constructor: ->
    @state =
      username: ""
      pass: ""

  ###
  # @params Event
  ###
  _updateFields: ({target: {name, value}}) => @setState "#{name}": value if name?

  render: -> <div>Login page...</div>

module.exports = Login
