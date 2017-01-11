"use strict"

import React from "react"
import {Router, browserHistory} from "react-router"
import {render} from "react-dom"
import {AppContainer} from "react-hot-loader"

import routes from "./routes"

const root = document.querySelector("#twi-root-container")

const routerParams = {
  history: browserHistory,
  routes: routes()
}

render(
  <AppContainer>
    <Router {...routerParams} />
  </AppContainer>,
  root
)

function acceptApp() {
  const nextRoutes = require("./routes").default

  const routerParams = {
    history: browserHistory,
    routes: routes()
  }

  render(
    <AppContainer>
      <Router {...routerParams} />
    </AppContainer>,
    root
  )
}

if (module.hot) {
  module.hot.accept("./routes", acceptApp)
}
