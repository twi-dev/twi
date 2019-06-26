import {unlink} from "promise-fs"

import {createModel, Model} from "core/db"

import calcHash from "./calcHash"
import schema from "./schema"

@createModel(schema)
class File extends Model {
  static async create({path, ...fields}, options) {
    const hash = await calcHash("sha512", path)

    return super.create({...fields, path, hash}, options)
  }

  async updateContent({path, ...fields}, options) {
    const hash = await calcHash("sha512", path)

    return this.update({$set: {...fields, path, hash}}, options)
      .then(() => File.findById(this.id))
  }

  remove() {
    return unlink(this.path).then(() => super.remove())
  }
}

export default File
