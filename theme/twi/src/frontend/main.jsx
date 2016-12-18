"use strict"

import React from "react"
import {Router, browserHistory} from "react-router"
import {render} from "react-dom"

import routes from "./routes"

const root = document.querySelector("#twi-root-container")

const routerParams = {
  history: browserHistory,
  routes: routes()
}

render(<Router {...routerParams} />, root)
