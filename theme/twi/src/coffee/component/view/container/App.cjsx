{Component} = React = require "react"

class App extends Component
  render: ->
    console.log @props.children
    <span>Foo</span>

module.exports = App
