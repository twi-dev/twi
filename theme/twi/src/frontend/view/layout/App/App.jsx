import React, {PropTypes} from "react"

import {
  pageMainContainer,
  pageContent
} from "./common.styl"

import Header from "../Header/Header"

function App(props) {
  const {width, height} = props

  return (
    <div
      className={pageMainContainer}
      style={{width, height}}
    >
      <Header />
      <div
        className={pageContent}
        style={{height: height - 46}}
      >
        {props.children}
      </div>
    </div>
  )
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
}

export default App
