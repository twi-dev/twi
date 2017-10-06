import Markdown from "markdown-it"
import invariant from "@octetstream/invariant"
import isPlainObject from "lodash/isPlainObject"
import isString from "lodash/isString"

import {createModel, Model} from "core/database"

import getType from "core/helper/util/getType"

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
  static async createOne(chapter, options = {}) {
    invariant(
      !chapter, TypeError, "Chapter is required. Received %s", getType(chapter)
    )

    invariant(
      !isPlainObject(chapter), TypeError,
      "Chapter should be a plain object. Received %s", getType(chapter)
    )

    invariant(
      !isString(chapter.text), TypeError,
      "Chapter text should be a string. Received %", getType(chapter.text)
    )

    // TODO: Move content storage to a static server
    const content = {
      original: chapter.text,
      rendered: md.render(chapter.text)
    }

    return await super.createOne({...chapter, content}, options)
  }
}

export default Chapter
