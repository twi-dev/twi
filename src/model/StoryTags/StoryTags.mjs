import {Model} from "sequelize"

import createModel from "core/db/createModel"

import schema from "./schema"
import indexes from "./indexes"

@createModel(schema, {indexes, timestamps: false})
class StoryTags extends Model { }

export default StoryTags
