import {observable} from "mobx"
import fetch from "helper/wrapper/fetch"

class Login {
  @observable _username = ""
  @observable _password = ""

  get username() {
    return this._username
  }

  set username(value) {
    this._username = value
  }

  get password() {
    return this._password
  }

  set password(value) {
    this._password = value
  }

  async submit() {
    const body = {
      username: this.username,
      password: this.password
    }

    return await fetch("http://localhost:1337/auth/login", {
      method: "POST", body
    })
  }
}

export default Login
