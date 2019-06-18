import {createModel, Model} from "core/db"

import calcHash from "./calcHash"
import schema from "./schema"

@createModel(schema)
class File extends Model {
  static async createOne({path, ...fields}, options) {
    const hash = await calcHash(path)

    return super.createOne({...fields, path, hash}, options)
  }
}

export default File
