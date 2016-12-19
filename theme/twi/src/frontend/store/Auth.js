import {observable, computed} from "mobx"
import fetch from "helper/wrapper/fetch"

class Auth {
  @observable _authentificationData = {
    username: "",
    password: ""
  }

  @computed get username() {
    return this._authentificationData.username
  }

  @computed get password() {
    return this._authentificationData.password
  }

  updateField(name, value) {
    this._authentificationData[name] = value
  }

  login() {
    const {username, password} = this

    console.log(username, password)

    const fulfill = fetch("http://localhost:1337/auth/login", {
      method: "POST",
      body: JSON.stringify({username, password})
    })

    console.log(fulfill)

    fulfill
      .then(res => console.log(res))
      .catch(err => console.error(err))
  }
}

export default new Auth
