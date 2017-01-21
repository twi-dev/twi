# import {observable, action} from "mobx"

# import Store from "store/container/Store"

# class Story extends Store {
#   @observable title = ""

#   @observable description = ""

#   @observable characters = []

#   @observable marks = []

#   @observable chapters = []

#   @observable isDraft = false

#   @observable cover = null

#   get endpoint() {
#     return "/stories/new"
#   }

#   @action addCharacter(character) {
#     this.characters.push(character)
#   }

#   @action async request(method = "POST") {
#     const {title, description, characters, marks, chapters, isDraft} = this

#     return await this.send(method, {
#       title,
#       description,
#       characters,
#       marks,
#       chapters,
#       isDraft
#     })
#   }
# }

# export default Story

{observable, action} = require "mobx"
{dms, dm} = require "decorator"

Store = require "store/container/Store"

class Story extends Store
  title: ""

  description: ""

  isDraft: no

  cover: null

  characters: []

  marks: []

  chapters: []

  updateCover: (files) => [@cover] = files

  request: =>
    return await @send "", "POST", {
      title, description, isDraft
      cover, characters, marks, chapters
    }

module.exports = dms Story, [
  dm observable, "title"
  dm observable, "description"
  dm observable, "isDraft"
  dm observable, "cover"
  dm observable, "characters"
  dm observable, "marks"
  dm observable, "chapters"
  dm action, "updateCover"
  dm action, "request"
]
