"use strict"

{createElement} = require "react"
{render} = require "react-dom"
{AppContainer} = require "react-hot-loader"

Root = require "container/Root"
routes = require "app/controller"

root = document.querySelector "#twi-root-container"

renderApp = (Root, routes) ->
  render createElement(
    AppContainer, null,
      createElement Root, {routes}
  ), root

fulfill = -> renderApp require("container/Root"), require "app/controller"

if module.hot
  module.hot.accept [
    "container/Root"
    "app/controller"
  ], fulfill

renderApp Root, routes
