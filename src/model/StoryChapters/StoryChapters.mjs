import {Model} from "sequelize"

import createModel from "core/db/createModel"

import indexes from "./indexes"
import schema from "./schema"

@createModel(schema, {indexes})
class StoryChapters extends Model {}

export default StoryChapters
