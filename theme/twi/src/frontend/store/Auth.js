import {observable, extendObservable} from "mobx"

class Auth {
  @observable username = ""
  @observable password = ""
}

export default new Auth
