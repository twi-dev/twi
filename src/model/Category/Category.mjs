import {Model} from "sequelize"

import createModel from "core/db/createModel"

import schema from "./schema"

@createModel(schema)
class Category extends Model {
  static tableName = "categories"
}

export default Category
