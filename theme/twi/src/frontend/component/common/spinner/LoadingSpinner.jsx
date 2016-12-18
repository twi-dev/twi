import React, {Component} from "react"

import {
  container,
  loading
} from "./spinner.styl"

class LoadingSpinner extends Component {
  render() {
    return (
      <div className={`${container} ${loading}`}>
        <img src="/assets/img/animated/pixel-art-magic-twi.gif" alt="" />
      </div>
    )
  }
}

export default LoadingSpinner
