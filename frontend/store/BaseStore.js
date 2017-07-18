import {observable} from "mobx"
// import gql from "frontend/transport/graphql"

class BaseStore {
  @observable _data = {}

  @observable _localData = {}

  get $data() {
    return this._data
  }

  get $local() {
    return this._localData
  }

  setValue(path, value) {}

  setLocalValue(path, value) {}
}

export default BaseStore
