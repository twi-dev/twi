{Component} = React = require "react"

LoadingSpinner = require "component/common/spinner/LoadingSpinner"

class Home extends Component
  render: -> <LoadingSpinner />

module.exports = Home
