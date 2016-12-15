{Component} = React = require "react"

{
  container
  loading
} = require "./spinner.styl"

class LoadingSpinner extends Component
  render: ->
    <div className="#{container} #{loading}">
      <img src="/assets/img/animated/pixel-art-magic-twi.gif" alt="" />
    </div>

module.exports = LoadingSpinner
