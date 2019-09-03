import {Model} from "sequelize"

import createModel from "core/db/createModel"

import schema from "./schema"

@createModel(schema)
class Story extends Model {
  static tableName = "stories"

  get isTranslation() {
    const {originalAuthor, originalTitle, originalUrl} = this

    return Boolean(originalAuthor && originalTitle && originalUrl)
  }
}

export default Story
