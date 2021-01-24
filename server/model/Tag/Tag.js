import {Model} from "sequelize"

import createModel from "server/lib/db/createModel"
import db from "server/lib/db/connection"

import schema from "./schema"

@createModel(schema)
class Tag extends Model {
  /**
   * Check if given tag name has a prefix
   *
   * @public
   * @static
   * @method
   *
   * @param {string} name
   *
   * @return boolean
   */
  static hasPrefix(name) {
    return /:/.test(name)
  }

  /**
   * @public
   * @static
   * @method
   *
   * @param {Object<[string], any>} options
   */
  static async create({name}, options) {
    const tag = new Tag({name})

    if (!Tag.hasPrefix(name)) {
      return tag.save(options)
    }

    const [prefix] = name.split(":")
    const Category = db.model("Category")

    const category = await Category.findOne({prefix})

    if (category) {
      tag.setCategory(category.id)
    }

    return tag.save(options)
  }
}

export default Tag
