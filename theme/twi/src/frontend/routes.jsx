import React from "react"
import {Route, IndexRoute} from "react-router"

import Main from "container/Main"
import Home from "view/home/Home/Home"
import About from "view/home/About/About"
import Feedback from "view/home/Feedback/Feedback"

import Auth from "container/Auth"
import Signup from "view/auth/Signup"
import Login from "view/auth/Login"

import NotFound from "view/error/http/NotFound"

function routes() {
  return (
    <div className="twi-main-container">
      <Route path="/" component={Main}>
        <IndexRoute component={Home} />
        <Route path="about" component={About} />
        <Route path="feedback" component={Feedback} />
      </Route>

      <Route path="auth" component={Auth}>
        <Route path="signup/:hash?" component={Signup} />
        <Route path="login" component={Login} />
      </Route>

      <Route path="*" component={NotFound} />
    </div>
  )
}

export default routes
