import {createElement} from "react"
import {render} from "react-dom"
import {AppContainer} from "react-hot-loader"

import App from "frontend/core/container/App"

const root = document.querySelector("#twi-root-container")

const app = App => render(
  createElement(AppContainer, null, createElement(App)), root
)

if (module.hot) {
  const fulfill = () => app(require("frontend/core/container/App").default)

  module.hot.accept(["frontend/core/container/App"], fulfill)
}

app(App)
