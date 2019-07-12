import {createModel, Model} from "core/db"

import schema from "./schema"

@createModel(schema)
class Chapter extends Model {}

export default Chapter
