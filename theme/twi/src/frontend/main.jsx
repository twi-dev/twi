"use strict"

import React from "react"
import {Router, browserHistory} from "react-router"
import {render} from "react-dom"
import {AppContainer} from "react-hot-loader"
import Root from "container/Root"

import routes from "./routes"

const root = document.querySelector("#twi-root-container")

render(
  <AppContainer>
    <Root />
  </AppContainer>,
  root
)

function acceptApp() {
  const NextRoot = require("container/Root").default

  // console.log("msg")

  render(
    <AppContainer>
      <NextRoot />
    </AppContainer>,
    root
  )
}

if (module.hot) {
  module.hot.accept(["container/Root", "./routes"], acceptApp)
}
