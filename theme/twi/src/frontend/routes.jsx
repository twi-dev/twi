import React from "react"
import {Route, IndexRoute} from "react-router"

import NotFound from "view/error/http/NotFound"
import App from "view/layout/App/App"
import Home from "view/home/Home/Home"
import About from "view/home/About/About"
import Feedback from "view/home/Feedback/Feedback"
import Signup from "view/auth/Signup"
import Login from "view/auth/Login"

function routes() {
  return (
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
  )
}

export default routes
