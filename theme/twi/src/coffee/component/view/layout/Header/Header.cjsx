{Component} = React = require "react"

{
  container
} = require "./header.styl"

class Header extends Component
  render: ->
    <div className="#{container}">
      Golden Oak
    </div>

module.exports = Header

