import React, {PropTypes} from "react"
import {Provider} from "mobx-react"
import login from "store/Login"

import Root from "./Root"

const stores = {
  login
}

class Auth extends Root {
  static propTypes = {
    children: PropTypes.element.isRequired
  }

  render() {
    const {width, height} = this.state

    return (
      <Provider {...stores}>
        <div style={{width, height}}>
          {this.props.children}
        </div>
      </Provider>
    )
  }
}

export default Auth
