{Component} = React = require "react"

class Signup extends Component
  constructor: ->
    @state =
      login: ""
      email: ""
      pass: ""
      repass: ""

  ###
  # @params Event
  ###
  _updateFields: ({target: {name, value}}) => @setState "#{name}": value if name?

  render: -> <div>Signup page...</div>

module.exports = Signup

