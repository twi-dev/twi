import Markdown from "markdown-it"
import invariant from "@octetstream/invariant"
import isPlainObject from "lodash/isPlainObject"
import isString from "lodash/isString"

import {createModel, Model} from "core/database"

import fromFields from "core/database/decorator/selectFromGraphQLFields"

import getType from "core/helper/util/getType"

const isArray = Array.isArray

const md = new Markdown({breaks: true})

@createModel
class Chapter extends Model {
  @fromFields static findMany({args}) {
    return super.findMany(args)
  }

  /**
   * Create a new chapter at exiting story
   *
   * @param {string} story – an ID of exiting story
   * @param {object} chapter
   *
   * @return {object}
   */
  static async createOne({args, options}) {
    const {chapter} = args

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

    return super.createOne({...chapter, content}, options)
  }

  static async createMany({args, options, ...props}) {
    const {chapters} = args

    if (!isArray(chapters)) {
      const chapter = chapters

      return [await this.createOne({...props, args: {chapter}, options})]
    }

    if (chapters.length === 1) {
      const [chapter] = chapters

      return [await this.createOne({...props, args: {chapter}, options})]
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
