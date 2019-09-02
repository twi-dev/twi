import {Model} from "sequelize"

import createModel from "core/db/createModel"

import schema from "./schema"

@createModel(schema)
class Tag extends Model {
  static tableName = "tags"
}

export default Tag
