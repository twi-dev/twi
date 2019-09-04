import {Model} from "sequelize"

import createModel from "core/db/createModel"

import schema from "./schema"

@createModel(schema)
class Tag extends Model { }

export default Tag
