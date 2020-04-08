import {Model} from "sequelize"

import createModel from "lib/db/createModel"

import schema from "./schema"
import hooks from "./hooks"

@createModel(schema, {hooks, paranoid: true})
class Story extends Model {
  get isTranslation() {
    const {originalAuthor, originalTitle, originalUrl} = this

    return Boolean(originalAuthor && originalTitle && originalUrl)
  }

  get isRemoved() {
    return Boolean(this.deletedAt)
  }

  hasPublisher(user) {
    if (!user) {
      return false
    }

    return this.userId === Number(user.id)
  }
}

export default Story
