{Component} = React = require "react"

common = require "./common.styl"

class App extends Component
  render: ->
    <div className="page-main-container">
      {@props.children}
    </div>

module.exports = App
