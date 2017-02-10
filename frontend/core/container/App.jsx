import React from "react"
import {Router, browserHistory as history} from "react-router"
import routes from "frontend/core/base/controller"

const props = {history, routes}

if (process.env.NODE_ENV === "development") {
  props.key = Math.random()
}

const App = () => <Router {...props} />

export default App
