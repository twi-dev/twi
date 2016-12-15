{Component} = React = require "react"

{pageMainContainer} = require "./common.styl"

Header = require "./Header"

class App extends Component
  render: ->
    <div className="#{pageMainContainer}">
      <Header />
      <div className="page-content">
        {@props.children}
      </div>
    </div>

module.exports = App
