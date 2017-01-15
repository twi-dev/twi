React = require "react"

{container, loading} = require "./spinner.styl"

LoadingSpinner = ->
  <div className="#{container} #{loading}">
    <img src="/assets/img/animated/pixel-art-magic-twi.gif" alt="Loading..." />
  </div>

module.exports = LoadingSpinner
