import {Model} from "sequelize"

import createModel from "lib/db/createModel"

import schema from "./schema"
import hooks from "./hooks"

@createModel(schema, {hooks})
class Category extends Model { }

export default Category
