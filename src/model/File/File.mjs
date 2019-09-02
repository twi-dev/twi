import {join} from "path"

import {unlink} from "promise-fs"
import {Model} from "sequelize"

import format from "date-fns/format"

import createModel from "core/db/createModel"
import BadRequest from "core/error/http/BadRequest"
import readOnly from "core/helper/decorator/readOnly"

import calcHash from "./util/calcHash"
import saveFile from "./util/saveFile"
import schema from "./schema"

const mask = "yyyy-MM-dd"

@createModel(schema)
class File extends Model {
  static tableName = "files"

  @readOnly static root = join(__dirname, "..", "..", "static", "file")

  static async create(file, options) {
    const path = format(new Date(), mask)
    const dest = join(File.root, format(path, file.filename))
    const hash = await calcHash(file.path, "sha512")

    await saveFile(file.path, dest)

    return super.create({...file, hash, path}, options)
  }

  static async unlink(id, options) {
    const file = await this.findByPk(id)

    if (!file) {
      throw new BadRequest("There's no such file.")
    }

    return file.unlink(options)
  }

  async updateContent(file, options) {
    const path = format(new Date(), mask)
    const dest = join(File.root, format(path, file.filename))
    const hash = await calcHash(file.path, "sha512")

    await saveFile(file.path, dest)

    return super.update({hash, path}, options)
  }

  unlink(options) {
    return unlink(join(File.root, this.path)).then(() => this.destroy(options))
  }
}

export default File
