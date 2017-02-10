import {observable, computed, action} from "mobx"

class UIStore {
  @observable _title = ""

  @computed get title() {
    return this._title
  }

  @action setTitle = title => this._title = title
}

export default UIStore
