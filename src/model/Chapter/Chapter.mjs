import {Model} from "sequelize"

import createModel from "core/db/createModel"
import toHtml from "core/md/toHtml"

import indexes from "./indexes"
import schema from "./schema"

@createModel(schema, {indexes, paranoid: true})
class Chapter extends Model {
  static async create({content, ...chapter}, options) {
    [chapter.contentMd, chapter.contentHtml] = [content, await toHtml(content)]

    // Automatically generate a title if there's no such thing
    if (!chapter.title) {
      chapter.title = `Chapter ${chapter.order}`
    }

    return super.create(chapter, options)
  }

  get isRemoved() {
    return Boolean(this.deletedAt)
  }

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
