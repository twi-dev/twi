{Component} = React = require "react"

class App extends Component
  render: -> <div className="page-main-container">{@props.children}</div>

module.exports = App
