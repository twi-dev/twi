import shortid from "shortid"
import isEmpty from "lodash/isEmpty"
import invariant from "@octetstream/invariant"

import {createModel, Model} from "core/database"

import Chapter from "database/model/Chapter"

import NotFound from "core/error/http/NotFound"

@createModel
class Story extends Model {
  /**
   * Co-authors roles
   */
  static get roles() {
    return {
      beta: 0,
      painter: 1,
      translator: 2,
      cowriter: 3,
      editor: 4 // Aka grammarly
    }
  }

  static async createOne(author, story) {
    const chapter = await Chapter.createOne(story.chapter, 1)

    const slug = shortid()

    return await super.createOne({...story, author, slug, chapter})
  }

  // NOTE: Just an unallowed method
  static async createMany() {
    invariant(
      true,
      "This method is not allowed in this class. Use %s.createOne instead.",
      Story.name
    )
  }

  /**
   * Find whatever stories. (10 per page)
   *
   * @param {number} cursor – page number
   *
   * @return {array}
   */
  static async findMany(cursor = 0) {
    const stories = await this.find().skip(cursor * 10).limit(10)

    return await Promise.all(stories.map(s => s.toJS()))
  }

  /**
   * Find stories created by given author
   *
   * @param {string} author – ID of an author which stories you are looking for
   *
   * @return {object}
   *
   * @throws {NotFound} – if no stories created by this user founded
   */
  static async findManyByAuthor(author) {
    const stories = await this.find().where({author}).exec()

    invariant(!stories, NotFound, "No stories created by this user founded.")

    return await Promise.all(stories.map(s => s.toJS()))
  }

  /**
   * @private
   */
  __getRoleName = role => this._findKey(Story.roles, role)

  /**
   * @see Model#toJS
   */
  async toJS(options) {
    // TODO: Add a co-authors population
    const story = await super.toJS(options)

    if (!isEmpty(this.coAuthors)) {
      for (const [idx, user] of this.coAuthors.entries()) {
        this.coAuthors[idx].role = this.__getRoleName(user.role)
      }
    }

    return story
  }
}

export default Story
