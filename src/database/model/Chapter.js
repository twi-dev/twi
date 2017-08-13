import Markdown from "markdown-it"
import invariant from "@octetstream/invariant"

import {createModel, Model} from "core/database"

// TODO: Setting up this one
const md = new Markdown({
  breaks: true
})

@createModel
class Chapter extends Model {
  /**
   * Create a new chapter at exiting story
   *
   * @param {string} story – an ID of exiting story
   * @param {object} chapter
   *
   * @return {object}
   */
  static async createOne(chapter, number) {
    invariant(!number, TypeError, "Chapter number is required.")

    const content = {
      original: chapter.text,
      rendered: md.render(chapter.text)
    }

    return await super.createOne({...chapter, content, number})
  }
}

export default Chapter
