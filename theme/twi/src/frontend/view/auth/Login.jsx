import React, {Component} from "react"
import {observer, inject} from "mobx-react"

import {container} from "./auth.styl"

@observer
export class Login extends Component {
  render() {
    return (
      <div className={container}>Foo</div>
    )
  }
}

export default inject("auth")(Login)
