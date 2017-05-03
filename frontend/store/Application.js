import {observable, action} from "mobx"

class Application {
  @observable title = ""

  constructor({title} = {}) {
    this.title = title
  }

  @action setTitle(title = "") {
    this.title = title
  }
}

export default Application
