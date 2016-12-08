"use strict"

{Component} = React = require "react"
{Router, browserHistory} = require "react-router"
{render} = require "react-dom"

routes = require "./routes"
root = document.querySelector "#twi-root-container"

render (
  <Router history={browserHistory} routes={do routes}></Router>
), root
