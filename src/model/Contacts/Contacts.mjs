import {Model} from "sequelize"

import createModel from "core/db/createModel"

import schema from "./schema"

@createModel(schema)
class Contacts extends Model {}

export default Contacts
