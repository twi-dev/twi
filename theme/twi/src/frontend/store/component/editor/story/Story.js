import {observable, action} from "mobx"

import Store from "store/container/Store"

class Story extends Store {
  @observable title = ""

  @observable description = ""

  @observable characters = []

  @observable marks = []

  @observable chapters = []

  @observable isDraft = false

  @observable cover = null

  get endpoint() {
    return "/stories/new"
  }

  @action addCharacter(character) {
    this.characters.push(character)
  }

  @action async request(method = "POST") {
    const {title, description, characters, marks, chapters, isDraft} = this

    return await this.send(method, {
      title,
      description,
      characters,
      marks,
      chapters,
      isDraft
    })
  }
}

export default Story
