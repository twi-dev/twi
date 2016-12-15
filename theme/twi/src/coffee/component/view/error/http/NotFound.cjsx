{Component} = React = require "react"
{Link} = require "react-router"

{
  mainContainer
  link
  image
  message
  codeNotFound
} = require "./http.styl"

class NotFound extends Component
  render: ->
    <div className="#{mainContainer}">
      <div className="#{image}">
        <img src="//localhost:2319/assets/img/errors/404.svg" alt="404" />
      </div>
      <div className="#{codeNotFound}">404</div>
      <div className="#{message}">
        This is not the web page you are looking for
      </div>
      <div className="#{link}">
        <Link to="/">Home</Link>
      </div>
    </div>

module.exports = NotFound
