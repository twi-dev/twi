import React, {Component} from "react"
import {Link} from "react-router"

import {
  container,
  navContainer
} from "./header.styl"

class Header extends Component {
  render() {
    return (
      <header className={`${container}`}>
        <div className={`${navContainer}`}>
          <Link to="/">Golden Oak</Link>
        </div>
      </header>
    )
  }
}

export default Header
