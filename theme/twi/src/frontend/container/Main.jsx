import React from "react"
import {Provider} from "mobx-react"
import DocumentTitle from "react-document-title"

import TokenStore from "store/component/token/Token"

import Root from "./Root"
import App from "../view/layout/App/App"


const stores = {
  tokenStore: new TokenStore()
}

class MainContainer extends Root {
  render() {
    const {width, height} = this.state

    return (
      <DocumentTitle title={this.state.title}>
        <Provider {...stores}>
          <App {...this.props} width={width} height={height} />
        </Provider>
      </DocumentTitle>
    )
  }
}

export default MainContainer
