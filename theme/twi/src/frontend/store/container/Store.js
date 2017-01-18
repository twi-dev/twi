import {action} from "mobx"
import fetch from "helper/wrapper/fetch"
import isPlainObject from "lodash/isPlainObject"

class Store {
  @action async send(endpoint, method, body) {
    if (isPlainObject(method)) {
      [body, method] = [method, body]
    }

    return await fetch(`${endpoint}`, {method, body})
  }
}

export default Store
