{PropTypes, createElement} = React = require "react"
{Router, browserHistory} = require "react-router"
{Provider} = require "mobx-react"

# TODO: Make stores injection dynamically as routes do
AppStore = require "store/container/App"

stores = {
  app: new AppStore
}

Root = ({routes}) ->
  props = {routes, history: browserHistory}

  props.key = do Math.random if process.env.NODE_ENV is "development"

  createElement Provider, stores,
    createElement Router, props

Root.propTypes = routes: PropTypes.object.isRequired

module.exports = Root
