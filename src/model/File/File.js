import {join} from "path"

import {unlink} from "promise-fs"
import {Model} from "sequelize"

import format from "date-fns/format"

import createModel from "lib/db/createModel"
import BadRequest from "lib/error/http/BadRequest"
import readOnly from "lib/helper/decorator/readOnly"

import calcHash from "./util/calcHash"
import saveFile from "./util/saveFile"
import schema from "./schema"

const mask = "yyyy-MM-dd"

/**
 * @typedef {import("sequelize").CreateOptions} CreateOptions
 * @typedef {import("sequelize").InstanceDestroyOptions} InstanceDestroyOptions
 * @typedef {import("sequelize").InstanceUpdateOptions} InstanceUpdateOptions
 */

@createModel(schema)
class File extends Model {
  @readOnly static root = join(__dirname, "..", "..", "static", "file")

  /**
   * Create a new File record in database
   *
   * @param {Object<string, any>} file
   * @param {InstanceDestroyOptions} options
   *
   * @return {Promise<File>}
   */
  static async create(file, options) {
    const path = join(format(new Date(), mask), file.filename)
    const hash = await calcHash(file.path, "sha512")
    const dest = join(File.root, path)

    await saveFile(file.path, dest)

    return super.create({...file, hash, path}, options)
  }

  /**
   * Remove a File from database
   *
   * @param {number} id
   * @param {InstanceDestroyOptions} options
   *
   * @return {Promise<void>}
   */
  static async unlink(id, options) {
    const file = await this.findByPk(id)

    if (!file) {
      throw new BadRequest("There's no such file.")
    }

    return file.unlink(options)
  }

  /**
   * @param {Object<string, any>} file
   * @param {InstanceUpdateOptions} options
   *
   * @return {Promise<File>}
   */
  async updateContent(file, options) {
    const path = join(format(new Date(), mask), file.filename)
    const hash = await calcHash(file.path, "sha512")
    const dest = join(File.root, path)

    await saveFile(file.path, dest)

    return super.update({hash, path}, options)
  }

  /**
   * @param {InstanceDestroyOptions} options
   */
  unlink(options) {
    return unlink(join(File.root, this.path)).then(() => this.destroy(options))
  }
}

export default File
