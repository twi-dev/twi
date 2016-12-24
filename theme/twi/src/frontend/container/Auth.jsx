import React from "react"
import {Provider} from "mobx-react"
import DocumentTitle from "react-document-title"

import Login from "store/auth/Login"
import Signup from "store/auth/Signup"

import Root from "./Root"

const stores = {
  login: new Login(),
  signup: new Signup()
}

class Auth extends Root {
  render() {
    const {width, height} = this.state

    return (
      <DocumentTitle title={this.state.title}>
        <Provider {...stores}>
          <div style={{width, height}}>
            {this.props.children}
          </div>
        </Provider>
      </DocumentTitle>
    )
  }
}

export default Auth
