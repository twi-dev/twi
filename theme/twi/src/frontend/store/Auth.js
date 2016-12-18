import {observable, computed} from "mobx"

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
}

export default new Auth
