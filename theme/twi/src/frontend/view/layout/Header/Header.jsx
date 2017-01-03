import React, {Component} from "react"
import {Link} from "react-router"

import {
  clearfix,
  container,
  navContainer
} from "./header.styl"

class Header extends Component {
  render() {
    return (
      <header>
        <div className={`${container}`}>
          <div className={`${navContainer}`}>
            <Link to="/">Golden Oak</Link>
          </div>
        </div>
        <div className={clearfix} />
      </header>
    )
  }
}

export default Header
