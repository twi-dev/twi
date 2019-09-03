import {Model} from "sequelize"

import createModel from "core/db/createModel"

import schema from "./schema"

@createModel(schema)
class Chapter extends Model {
  static tableName = "chapters"
}

export default Chapter
