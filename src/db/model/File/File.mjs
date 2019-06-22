import {createModel, Model} from "core/db"

import calcHash from "./calcHash"
import schema from "./schema"

@createModel(schema)
class File extends Model {
  static async create({path, ...fields}, options) {
    const hash = await calcHash("sha512", path)

    return super.create({...fields, path, hash}, options)
  }
}

export default File
