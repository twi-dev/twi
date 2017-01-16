import {observable} from "mobx"
import fetch from "helper/wrapper/fetch"

import Store from "store/container/Store"

class Token extends Store {
  @observable current = ""

  @observable suggestions = []

  @observable isActive = false

  async request(endpoint, name) {
    return await fetch(`${endpoint}`, {body: `${name}`})
  }
}

export default Token
