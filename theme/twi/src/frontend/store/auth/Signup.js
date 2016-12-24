import {observable} from "mobx"
import fetch from "helper/wrapper/fetch"

class Signup {
  @observable _login = ""
  @observable _email = ""
  @observable _pass = ""

  set login(value) {
    this._login = value
  }

  get login() {
    return this._login
  }

  set email(value) {
    this._email = value
  }

  get email() {
    return this._email
  }

  set password(value) {
    this._pass = value
  }

  get password() {
    return this._pass
  }

  async submit() {
    const body = {
      login: this.login,
      email: this.email,
      password: this.password
    }

    return await fetch("http://localhost:1337/auth/signup", {
      method: "POST", body
    })
  }
}

export default new Signup
