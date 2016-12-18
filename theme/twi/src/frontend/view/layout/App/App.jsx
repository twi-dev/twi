import React, {Component, PropTypes} from "react"
import {observer, inject} from "mobx-react"

import {
  pageMainContainer,
  pageContent
} from "./common.styl"

import AppStore from "./AppStore"
import Header from "../Header/Header"

@observer
class App extends Component {
  static propTypes = {
    appStore: PropTypes.instanceOf(AppStore),
    children: PropTypes.element
  }

  componentWillMount = () => (
    window.addEventListener("resize", this._onWindowResize, false)
  )

  _onWindowResize = () => this.props.appStore.res

  render() {
    const {width, height} = this.props.appStore

    return (
      <div
        className={`${pageMainContainer}`}
        style={{width, height}}
      >
        <Header />
        <div className={`${pageContent}`} style={{height: height - 46}}>
          {this.props.children}
        </div>
      </div>
    )

  }
}

export default inject("appStore")(App)
