{Component} = React = require "react"
{Link} = require "react-router"
{observer} = require "mobx-react"

{
  container
  navContainer
} = require "./header.styl"

class Header extends Component
  render: ->
    <header className="#{container}">
      <div className="#{navContainer}">
        <Link to="/">Golden Oak</Link>
      </div>
    </header>

module.exports = observer Header
