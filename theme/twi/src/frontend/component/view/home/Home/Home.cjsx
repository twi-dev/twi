{Component} = React = require "react"
{dms, dm} = require "decorator"

LoadingSpinner = require "component/common/spinner/LoadingSpinner"

class Home extends Component
  render: -> <LoadingSpinner />

module.exports = Home
