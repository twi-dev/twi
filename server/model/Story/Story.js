import {Model} from "sequelize"

import createModel from "server/lib/db/createModel"

import schema from "./schema"
import hooks from "./hooks"

@createModel(schema, {hooks, paranoid: true})
class Story extends Model {
  /**
   * @public
   *
   * @type boolean
   */
  get isTranslation() {
    const {originalAuthor, originalTitle, originalUrl} = this

    return Boolean(originalAuthor && originalTitle && originalUrl)
  }

  /**
   * @public
   *
   * @type boolean
   */
  get isRemoved() {
    return Boolean(this.deletedAt)
  }
}

export default Story
