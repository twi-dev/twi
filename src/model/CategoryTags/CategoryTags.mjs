import {Model} from "sequelize"

import createModel from "core/db/createModel"

import schema from "./schema"
import indexes from "./indexes"

@createModel(schema, {indexes})
class CategoryTags extends Model {
  static tableName = "category_tags"
}

export default CategoryTags
