import {createModel, Model} from "core/db"

import freeze from "js-flock/deepFreeze"

import readOnly from "core/helper/decorator/readOnly"

import schema from "./schema"

@createModel(schema)
class Chapter extends Model {
  @readOnly static alwaysSelect = freeze(["content"])

  addTextContent(fileId) {
    return this.update({$set: {"content.text": fileId}})
  }

  addHtmlContent(fileId) {
    return this.update({$set: {"content.html": fileId}})
  }
}

export default Chapter
