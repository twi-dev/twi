import {Model} from "sequelize"

import createModel from "server/lib/db/createModel"
import toHtml from "server/lib/md/toHtml"

import indexes from "./indexes"
import schema from "./schema"

/**
 * @typedef {import("sequelize").CreateOptions} CreateOptions
 * @typedef {import("sequelize").InstanceUpdateOptions} InstanceUpdateOptions
 */

@createModel(schema, {indexes, paranoid: true})
class Chapter extends Model {
  /**
   * @public
   * @static
   * @method
   *
   * @param {Object} chapter
   * @param {string} chapter.content
   * @param {CreateOptions} options
   *
   * @return {Promise<Chapter>}
   */
  static async create({content, ...chapter}, options) {
    [chapter.contentMd, chapter.contentHtml] = [content, await toHtml(content)]

    // Automatically generate a title if there's no such thing
    if (!chapter.title) {
      chapter.title = `Chapter ${chapter.order}`
    }

    return super.create(chapter, options)
  }

  /**
   * @type {boolean}
   */
  get isRemoved() {
    return Boolean(this.deletedAt)
  }

  /**
   * @public
   * @method
   *
   * @param {Object} params
   * @param {string} params.content
   * @param {InstanceUpdateOptions} options
   *
   * @return {Promise<Chapter>}
   */
  async update({content, ...chapter}, options) {
    if (chapter.content) {
      [chapter.contentMd, chapter.contentHtml] = [
        content, await toHtml(content)
      ]
    }

    return super.update(chapter, options)
  }
}

export default Chapter
