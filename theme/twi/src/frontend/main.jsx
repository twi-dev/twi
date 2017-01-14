"use strict"

import React from "react"
import {render} from "react-dom"
import {AppContainer} from "react-hot-loader"
import routes from "routes"
import Root from "container/Root"

const root = document.querySelector("#twi-root-container")

const renderApp = App => render(
  <AppContainer><App routes={routes} /></AppContainer>, root
)

const acceptApp = () => {
  require("routes").default

  renderApp(require("container/Root").default)
}

renderApp(Root)

if (module.hot) {
  module.hot.accept(["container/Root", "routes"], acceptApp)
}
