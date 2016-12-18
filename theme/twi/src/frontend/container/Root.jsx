import {Component} from "react"

import windowSize from "helper/dom/windowSize"

class Root extends Component {
  constructor() {
    super()

    const {width, height} = windowSize()

    this.state = {
      width,
      height
    }
  }

  componentWillMount() {
    window.addEventListener("resize", this._onWindowResize, false)
  }

  _onWindowResize = () => {
    const {width, height} = windowSize()

    this.setState({width, height})
  }

  render() {}
}

export default Root
