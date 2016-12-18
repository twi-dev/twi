import {observable} from "mobx"

class Auth {
  @observable authentificationData = {
    username: "",
    password: ""
  }

  setUsername(username) {
    this.username = username
  }

  setPassword(password) {
    this.password = password
  }
}

export default new Auth
