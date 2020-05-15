import {join} from "path"

import {nanoid} from "nanoid/async"
import {stat, unlink, readFile, outputFile} from "fs-extra"
import {Model} from "sequelize"

import format from "date-fns/format"

import createModel from "lib/db/createModel"
import readOnly from "lib/helper/decorator/readOnly"
import waterfall from "lib/helper/array/runWaterfall"
import calcFileHash from "lib/helper/util/calcFileHash"

import schema from "./schema"

const mask = "yyyy-MM-dd"

const getSize = path => stat(path).then(({size}) => size)

const getPath = (dest, ext) => nanoid().then(prefix => join(
  dest, `${prefix}-${format(Date.now(), mask)}${ext}`
))

/**
 * @typedef {import("sequelize").CreateOptions} CreateOptions
 */

/**
 * @typedef {import("sequelize").UpdateOptions} UpdateOptions
 */

/**
 * @typedef {import("sequelize").DestroyOptions} DestroyOptions
 */

/**
 * @typedef {Object} FileInput
 *
 * @property {string} dest
 * @property {string} path
 * @property {string} mime
 * @property {string} hash
 * @property {number} size
 */

@createModel(schema, {paranoid: true})
class File extends Model {
  /**
   * @public
   * @static
   * @property
   *
   * @type {string}
   */
  @readOnly static root = join(__dirname, "..", "..", "static");

  /**
   * @param {Object} params
   * @param {string} params.dest File destination directory
   * @param {FileInput} params.file
   * @param {CreateOptions} [options = {}]
   */
  static async create({dest, file}, options = {}) {
    const path = await getPath(dest, file.extname)
    const filename = join(File.root, path)
    const size = await getSize(filename)

    await readFile(file.path).then(content => outputFile(filename, content))

    const hash = await calcFileHash(filename, "sha512")

    return super.create({...file, path, hash, size}, options)
  }

  /**
   * @param {Object} params
   * @param {string} params.dest File destination directory
   * @param {FileInput} params.file
   * @param {UpdateOptions} [options = {}]
   */
  async updateContent({dest, file}, options = {}) {
    const path = await getPath(dest, file.extname)
    const filename = join(File.root, path)
    const size = await getSize(filename)

    return waterfall([
      () => readFile(file.path),

      content => outputFile(filename, content),

      () => unlink(join(File.root, this.path)),

      () => calcFileHash(filename, "sha512"),

      hash => super.update({...file, path, hash, size}, options),
    ])
  }

  /**
   * @param {DestroyOptions} [options = {}]
   */
  async unlink(options = {}) {
    return unlink(join(File.root, this.path)).then(() => super.destroy(options))
  }
}

export default File
