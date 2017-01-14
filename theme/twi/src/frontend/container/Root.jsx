import React, {PropTypes} from "react"
import {Router, browserHistory} from "react-router"

// FIXME: `key` prop is a temporarily hack, I have to find another solution.
// https://github.com/reactjs/react-router-redux/issues/179
// https://github.com/ReactTraining/react-router/issues/2704
const Root = ({routes}) => (
  <Router history={browserHistory}>{routes}</Router>
)

Root.propTypes = {
  routes: PropTypes.element
}

export default Root
