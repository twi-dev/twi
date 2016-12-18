import React, {PropTypes} from "react"
import {Provider} from "mobx-react"

import Root from "./Root"
import App from "../view/layout/App/App"

const stores = {}

class MainContainer extends Root {
  static propTypes = {
    children: PropTypes.element.isRequired
  }

  render() {
    const {width, height} = this.state

    return (
      <Provider {...stores}>
        <App {...this.props} width={width} height={height} />
      </Provider>
    )
  }
}

export default MainContainer
