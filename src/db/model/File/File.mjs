import {join} from "path"

import {unlink} from "promise-fs"

import format from "date-fns/format"

import {createModel, Model} from "core/db"

import readOnly from "core/helper/decorator/readOnly"
import BadRequest from "core/error/http/BadRequest"

import calcHash from "./util/calcHash"
import saveFile from "./util/saveFile"
import schema from "./schema"

const getDate = () => format(new Date(), "yyyy-MM-dd")

@createModel(schema)
class File extends Model {
  @readOnly static root = join(__dirname, "..", "..", "..", "static", "file")

  static async create({path: oldPath, filename, ...fields}, options) {
    const newPath = join(File.root, fields.userId, getDate(), filename)
    const hash = await calcHash("sha512", oldPath)

    await saveFile(oldPath, newPath)

    return super.create({...fields, hash, path: newPath}, options)
  }

  static async unlink(id, options) {
    const file = await this.findById(id)

    if (!file) {
      throw new BadRequest("There's no such file.")
    }

    return file.unlink(options)
  }

  async updateContent({path: oldPath, filename, ...fields}, options) {
    const newPath = join(File.root, this.userId, getDate(), filename)
    const hash = await calcHash("sha512", oldPath)

    await saveFile(oldPath, newPath)

    return this.update({$set: {...fields, hash, path: newPath}}, options)
  }

  unlink(options) {
    return unlink(this.path).then(() => this.remove(options))
  }
}

export default File
