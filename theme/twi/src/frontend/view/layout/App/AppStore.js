import {observable, computed} from "mobx"
import windowSize from "helper/dom/windowSize"

export class AppStore {
  @observable width = 0
  @observable height = 0

  constructor() {
    this.res
  }

  @computed get res() {
    const {width, height} = windowSize()

    this.width = width
    this.height = height
  }
}

export default AppStore
