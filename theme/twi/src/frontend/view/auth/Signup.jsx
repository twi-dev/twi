import React, {Component} from "react"

import {raised, violet} from "button.styl"
import {
  container,
  title,
  fieldContainer,
  fieldsContainer,
  fields,
  signup
} from "./auth.styl"

import preventBeforeSubmit from "helper/decorator/preventBeforeSubmit"

export class Signup extends Component {
  static title = "Signup"

  constructor() {
    super()

    this._onSubmit = this._onSubmit.bind(this)
  }

  @preventBeforeSubmit
  _onSubmit() {}

  render() {
    return (
      <div className={container}>
        <form onSubmit={this._onSubmit}>
          <div className={title}>Signup</div>
          <div className={fieldsContainer}>
            <div className={fields}>
              <div className={fieldContainer}>
                <input
                  className={signup}
                  type="text"
                  name="login"
                  placeholder="Your login"
                />
              </div>
              <div className={fieldContainer}>
                <input
                  className={signup}
                  type="text"
                  name="email"
                  placeholder="Your email address"
                />
              </div>
              <div className={fieldContainer}>
                <input
                  className={signup}
                  type="password"
                  name="password"
                  placeholder="Your password"
                />
              </div>
              <div className={fieldContainer}>
                <button
                  className={`${raised} ${violet}`}
                >Sign up</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default Signup
