import React from "react"
import {Provider} from "mobx-react"
import DocumentTitle from "react-document-title"

import TokenStore from "store/component/common/token/Token"
import CharacterStore from "store/view/story/editor/Character"

import App from "./App"
import Layout from "../view/layout/App/Layout"

const stores = {
  tokenStore: new TokenStore(),
  character: new CharacterStore()
}

class MainContainer extends App {
  render() {
    const {width, height} = this.state

    return (
      <DocumentTitle title={this.state.title}>
        <Provider {...stores}>
          <Layout {...this.props} width={width} height={height} />
        </Provider>
      </DocumentTitle>
    )
  }
}

export default MainContainer
