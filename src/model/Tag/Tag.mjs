import {Model} from "sequelize"

import createModel from "lib/db/createModel"
import db from "lib/db/connection"

import schema from "./schema"

@createModel(schema)
class Tag extends Model {
  static hasPrefix(name) {
    return /:/.test(name)
  }

  async create({name}, options) {
    const tag = new Tag({name})

    if (!Tag.hasPrefix(name)) {
      return tag.save(options)
    }

    const [prefix] = name.split(":")
    const Category = db.model("Category")

    const category = await Category.findOne({prefix: `${prefix}:`})

    if (category) {
      tag.setCategory(category.id)
    }

    return tag.save(options)
  }
}

export default Tag
