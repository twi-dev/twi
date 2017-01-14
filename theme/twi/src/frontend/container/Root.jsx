import React, {PropTypes} from "react"
import {Router, browserHistory} from "react-router"

const Root = ({routes}) => <Router history={browserHistory}>{routes}</Router>

Root.propTypes = {
  routes: PropTypes.element
}

export default Root
