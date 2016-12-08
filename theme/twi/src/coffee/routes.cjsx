React = require "react"
{Route, IndexRoute} = require "react-router"

NotFound = require "component/view/error/http/NotFound"

App = require "component/view/container/App"

routes = ->
  <div className="twi-main-container">
    <Route path="/" component={App}>
    </Route>

    <Route path="*" component={NotFound} />
  </div>

module.exports = routes
