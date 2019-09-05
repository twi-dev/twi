import {Model} from "sequelize"

import createModel from "core/db/createModel"
import toHtml from "core/md/toHtml"

import schema from "./schema"

@createModel(schema)
class Chapter extends Model {
  static async create({content, ...chapter}, options) {
    [chapter.contentMd, chapter.contentHtml] = [content, await toHtml(content)]

    return super.create(chapter, options)
  }
}

export default Chapter
