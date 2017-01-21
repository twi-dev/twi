{PropTypes, createElement} = React = require "react"
{Router, browserHistory} = require "react-router"
{Provider} = require "mobx-react"

Root = ({routes}) ->
  props = {routes, history: browserHistory}

  props.key = do Math.random if process.env.NODE_ENV is "development"

  createElement Provider, null,
    createElement Router, props

Root.propTypes = routes: PropTypes.object.isRequired

module.exports = Root
