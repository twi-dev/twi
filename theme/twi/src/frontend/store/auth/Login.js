import {observable, computed} from "mobx"
import fetch from "helper/wrapper/fetch"

class Login {
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

    fetch("http://localhost:1337/auth/login", {
      method: "POST",
      body: {username, password}
    })
      .then(res => console.log(res))
      .catch(err => console.error(err))
  }
}

export default new Login
