import React, {PropTypes} from "react"
import {Router, browserHistory} from "react-router"
// import {AppContainer} from "react-hot-loader"

import routes from "routes"

// const routerParams = {
//   history: browserHistory,
//   routes: routes()
// }

// FIXME: `key` prop is a temporarily hack, I have to find another solution.
// https://github.com/reactjs/react-router-redux/issues/179
// https://github.com/ReactTraining/react-router/issues/2704
function Root() {
  return (
    <Router
      key={module.hot ? Math.random() : undefined}
      history={browserHistory}
    >{routes}</Router>
  )
}

// Root.propTypes = {
//   history: PropTypes.object.isRequired,
//   routes: PropTypes.object.isRequired
// }

export default Root
