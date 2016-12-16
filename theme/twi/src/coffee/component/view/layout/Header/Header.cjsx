{Component} = React = require "react"
{Link} = require "react-router"

{
  container
} = require "./header.styl"

class Header extends Component
  render: ->
    <div className="#{container}">
      <Link to="/">Golden Oak</Link>
    </div>

module.exports = Header

