import React, {createElement} from "react"
import {Router, browserHistory as history} from "react-router"
import routes from "frontend/core/base/controller"

const props = {history, routes}

const App = () => <Router {...props} />

export default App
