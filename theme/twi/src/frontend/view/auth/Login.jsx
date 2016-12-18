import React, {Component, PropTypes} from "react"
import {observer, inject} from "mobx-react"

import {container} from "./auth.styl"

@observer
export class Login extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
  }

  render() {
    const {username, password} = this.props.auth

    console.log(this.props.auth)

    return (
      <div className={container}>
        <form>
          <div>
            <input
              type="text"
              placeholder="Your email or login"
              value={username}
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Your password"
              value={password}
            />
          </div>
        </form>
      </div>
    )
  }
}

export default inject("auth")(Login)
