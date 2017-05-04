import React from "react"
import {instanceOf} from "prop-types"

import compose from "lodash/fp/compose"

import connect from "frontend/helper/decorator/connect"
import title from "frontend/helper/decorator/title"

import Application from "frontend/store/Application"

const Home = () => <div>Yay!</div>

Home.getInitialStores = function() {
  const app = new Application({
    title: "Twilight's Library"
  })

  return {app}
}

Home.propTypes = {
  app: instanceOf(Application).isRequired
}

export default compose(connect, title)(Home)
