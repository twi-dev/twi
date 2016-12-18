"use strict"

import React from "react"
import {Provider} from "mobx-react"
import {Router, browserHistory} from "react-router"
import {render} from "react-dom"

import routes from "./routes"
import AppStore from "view/layout/App/AppStore"

const root = document.querySelector("#twi-root-container")

const routerParams = {
  history: browserHistory,
  routes: routes()
}

const stores = {
  appStore: new AppStore
}

render(<Provider {...stores}><Router {...routerParams} /></Provider>, root)
