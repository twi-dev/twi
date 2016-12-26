{Component} = React = require "react"

LoadingSpinner = require "component/common/spinner/LoadingSpinner"

class Home extends Component
  @title: "Golden Oak"

  render: -> <LoadingSpinner />

module.exports = Home
