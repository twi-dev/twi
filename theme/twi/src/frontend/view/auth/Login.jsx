import React, {Component, PropTypes} from "react"
import {Link} from "react-router"
import {observer, inject} from "mobx-react"

import preventBeforeSubmit from "helper/decorator/preventBeforeSubmit"

import {
  container,
  title,
  fieldContainer,
  fields
} from "./auth.styl"

@inject("auth") @observer
export class Login extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
  }

  _updateField = ({target: {name, value}}) => (
    this.props.auth.updateField(name, value)
  )

  @preventBeforeSubmit
  _submit() {
    console.log("Submitting...")
  }

  render() {
    const {username, password} = this.props.auth

    return (
      <div className={container}>
        <form onSubmit={this._submit}>
          <div className={title}>Login</div>
          <div className={fields}>
            <div className={fieldContainer}>
              <input
                type="text"
                name="username"
                placeholder="Your email or login"
                value={username}
                onChange={this._updateField}
              />
            </div>
            <div className={fieldContainer}>
              <input
                type="password"
                name="password"
                placeholder="Your password"
                value={password}
                onChange={this._updateField}
              />
            </div>
          </div>
          <div className={fieldContainer}>
            <button>Sign in</button>
          </div>
          <div className={fieldContainer}>
            <Link to="/restore">Forgot your password?</Link>
          </div>
        </form>
      </div>
    )
  }
}

export default Login
