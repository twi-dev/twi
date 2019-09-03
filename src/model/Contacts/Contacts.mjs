import {Model} from "sequelize"

import createModel from "core/db/createModel"

import schema from "./schema"

@createModel(schema, {timestamps: false})
class Contacts extends Model {
  static tableName = "contacts"
}

export default Contacts
