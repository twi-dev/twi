import {action} from "mobx"
import fetch from "helper/wrapper/fetch"

class Store {
  get endpoint() {}

  @action async send(method = "GET", body = null) {
    return await fetch(`${this.endpoint}`, {method, body})
  }
}

export default Store
