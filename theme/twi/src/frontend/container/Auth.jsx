import React, {PropTypes} from "react"
import {Provider} from "mobx-react"
import auth from "store/Auth"

import Root from "./Root"

const stores = {
  auth
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
