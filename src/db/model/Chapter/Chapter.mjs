import Markdown from "markdown-it"

import {createModel, Model} from "core/db"

import schema from "./schema"

const isArray = Array.isArray

// TODO: Replace with remark
const md = new Markdown({breaks: true})

@createModel(schema)
class Chapter extends Model {
  /**
   * Create a new chapter at exiting story
   *
   * @param {string} story – an ID of exiting story
   * @param {object} chapter
   *
   * @return {object}
   */
  static async create(chapter, options) {
    // TODO: Move content storage to a static server
    const content = {
      original: chapter.text,
      rendered: md.render(chapter.text)
    }

    return super.create({...chapter, content}, options)
  }

  static async createMany(chapters, options = {}) {
    if (!isArray(chapters)) {
      chapters = [chapters]
    }

    // TODO: Move chapters serving to files.
    for (const [idx, chapter] of chapters.entries()) {
      chapters[idx].content = {
        original: chapter.text,
        rendered: await md.render(chapter.text)
      }
    }

    return super.createMany(chapters, options)
  }
}

export default Chapter
