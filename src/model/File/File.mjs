import {join} from "path"

import {unlink} from "promise-fs"
import {Model} from "sequelize"

// import format from "date-fns/format"

import createModel from "core/db/createModel"
import readOnly from "core/helper/decorator/readOnly"

import schema from "./schema"

@createModel(schema)
class File extends Model {
  @readOnly static root = join(__dirname, "..", "..", "static", "file")

  static async create(file, options) {
    return super.create(file, options)
  }

  unlink(options) {
    return unlink(join(File.root, this.path)).then(() => this.destroy(options))
  }
}

export default File
