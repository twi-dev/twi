import {join} from "path"

import {unlink} from "promise-fs"

import format from "date-fns/format"
import freeze from "js-flock/deepFreeze"

import {createModel, Model} from "core/db"

import readOnly from "core/helper/decorator/readOnly"
import BadRequest from "core/error/http/BadRequest"

import calcHash from "./util/calcHash"
import saveFile from "./util/saveFile"
import schema from "./schema"

@createModel(schema)
class File extends Model {
  @readOnly static alwaysSelect = freeze(["userId"])

  @readOnly static root = join(__dirname, "..", "..", "..", "static", "file")

  static async create({path: oldPath, filename, ...fields}, options) {
    const newPath = join(File.root, format(new Date(), "yyyy-MM-dd"), filename)
    const hash = await calcHash(oldPath, "sha512")

    await saveFile(oldPath, newPath)

    return super.create({...fields, hash, path: newPath}, options)
  }

  static async createMany(files, options) {
    for (const [index, fields] of files.entries()) {
      const hash = await calcHash(fields.path, "sha512")
      const newPath = join(
        File.root, format(new Date(), "yyyy-MM-dd"), fields.filename
      )

      await saveFile(fields.path, newPath)

      files[index] = {...fields, hash}
    }

    return super.createMany(files, options)
  }

  static async unlink(id, options) {
    const file = await this.findById(id)

    if (!file) {
      throw new BadRequest("There's no such file.")
    }

    return file.unlink(options)
  }

  async updateContent({path: oldPath, filename, ...fields}, options) {
    const newPath = join(File.root, format(new Date(), "yyyy-MM-dd"), filename)
    const hash = await calcHash(oldPath, "sha512")

    await saveFile(oldPath, newPath)

    return this.update({$set: {...fields, hash, path: newPath}}, options)
  }

  unlink(options) {
    return unlink(this.path).then(() => this.remove(options))
  }
}

export default File
