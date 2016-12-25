import {observable} from "mobx"
import fetch from "helper/wrapper/fetch"

class Signup {
  @observable _login = ""
  @observable _email = ""
  @observable _pass = ""

  get login() {
    return this._login
  }

  set login(value) {
    this._login = value
  }

  get email() {
    return this._email
  }

  set email(value) {
    this._email = value
  }

  get password() {
    return this._pass

  }
  set password(value) {
    this._pass = value
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

export default Signup
