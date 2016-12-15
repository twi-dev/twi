React = require "react"
{Route, IndexRoute} = require "react-router"

NotFound = require "component/view/error/http/NotFound"

App = require "component/view/layout/App/App"

# Home
Home = require "component/view/home/Home/Home"
About = require "component/view/home/About/About"
Feedback = require "component/view/home/Feedback/Feedback"

# Auth
Signup = require "component/view/auth/Signup"
Login = require "component/view/auth/Login"

routes = ->
  <div className="twi-main-container">
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="about" component={About} />
      <Route path="feedback" component={Feedback} />
      <Route path="auth">
        <Route path="signup/:hash?" component={Signup} />
        <Route path="login" component={Login} />
      </Route>
    </Route>

    <Route path="*" component={NotFound} />
  </div>

module.exports = routes
