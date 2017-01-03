{Component, PropTypes} = React = require "react"

class TokenEditor extends Component
  _onChange: ({target: {value}}) =>

  placeholder: "Start typing token here"

  render: ->
    <div className="container">
      <input type="text" placeholder="#{@placeholder}" />
      <div className="list"></div>
    </div>

module.exports = TokenEditor

