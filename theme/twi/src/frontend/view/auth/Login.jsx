import React, {Component, PropTypes} from "react"
import {Link} from "react-router"
import {observer, inject} from "mobx-react"

import preventBeforeSubmit from "helper/decorator/preventBeforeSubmit"
import {raised, violet} from "button.styl"

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

  constructor() {
    super()

    this._onSubmit = this._onSubmit.bind(this)
  }

  _updateField = ({target: {name, value}}) => (
    this.props.auth.updateField(name, value)
  )

  submit = () => {}

  @preventBeforeSubmit
  _onSubmit() {
    this.props.auth.login()
  }

  render() {
    const {username, password} = this.props.auth

    return (
      <div className={container}>
        <form onSubmit={this._onSubmit}>
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
            <div className={fieldContainer}>
              <button className={`${raised} ${violet}`}>Sign in</button>
            </div>
            <div className={fieldContainer}>
              <Link to="/auth/restore">Forgot your password?</Link>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default Login
