import {observable} from "mobx"

/**
 * Store for StoryEditor
 */
class Story {
  @observable _title = ""
  @observable _description = ""
  @observable _synopsis = ""
  @observable _characters = []
  @observable _chapters = []
  @observable _marks = []
  @observable _draft = false


  get title() {
    return this._title
  }

  set title(value) {
    this._title = value
  }

  get description() {
    return this._description
  }

  set description(value) {
    this._description = value
  }

  get synopsis() {
    return this._synopsis
  }

  set synopsis(value) {
    this._synopsis = value
  }

  get characters() {
    return this._characters
  }

  set characters(value) {
    this._characters = value
  }

  get chapters() {
    return this._chapters
  }

  set chapters(value) {
    this._chapters = value
  }

  get marks() {
    return this._marks
  }

  set marks(value) {
    this._marks = value
  }

  get draft() {
    return this._draft
  }

  set draft(value) {
    this._draft = value
  }

  submit() {}
}

export default Story
