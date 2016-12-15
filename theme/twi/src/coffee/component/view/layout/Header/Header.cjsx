{Component} = React = require "react"

{
  container
} = require "./header.styl"

class Header extends Component
  render: ->
    <div className="#{container}">
      Header...
    </div>

module.exports = Header

