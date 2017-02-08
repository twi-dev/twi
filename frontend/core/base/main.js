import {createElement} from "react"
import {render} from "react-dom"
import {AppContainer} from "react-hot-loader"

import App from "./App"

// tmp
import "core/helper/util/resolver"

const root = document.querySelector("#twi-root-container")

const app = App => render(
  createElement(AppContainer, null, createElement(App)), root
)

const fulfill = () => app(require("./App").default)

if (module.hot) {
  module.hot.accept(["./App"], fulfill)
}

app(App)
