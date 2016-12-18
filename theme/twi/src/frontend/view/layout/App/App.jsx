import React, {Component, PropTypes} from "react"
import {observer} from "mobx-react"
import windowSize from "helper/dom/windowSize"

import {
  pageMainContainer,
  pageContent
} from "./common.styl"

import Header from "../Header/Header"

@observer
class App extends Component {
  static propTypes = {
    children: PropTypes.element
  }

  constructor() {
    super()

    const {width, height} = windowSize()

    this.state = {
      width,
      height
    }
  }

  componentWillMount = () => (
    window.addEventListener("resize", this._onWindowResize, false)
  )

  _onWindowResize = () => {
    const {width, height} = windowSize()

    this.setState({width, height})
  }

  render() {
    return (
      <div
        className={`${pageMainContainer}`}
        style={{
          width: this.state.width , height: this.state.height
        }}
      >
        <Header />
        <div
          className={`${pageContent}`}
          style={{height: this.state.height - 46}}
        >
          {this.props.children}
        </div>
      </div>
    )

  }
}

export default App
