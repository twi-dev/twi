import limax from "limax"
import isEmpty from "lodash/isEmpty"
import isPlainObject from "lodash/isPlainObject"
import invariant from "@octetstream/invariant"

import {createModel, Model} from "core/database"

import Chapter from "database/model/Chapter"

import NotFound from "core/error/http/NotFound"

import nanoid from "core/helper/util/slug"

const isArray = Array.isArray

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
      writer: 3,
      editor: 4 // Aka grammarly
    }
  }

  /**
   * Create one story
   *
   * @param {mongoose.Types.ObjectId|string} author – A user id which will
   *  be added as story author
   *
   * @param {object} story – story content
   *
   * @return {object} – created story
   */
  static async createOne(author, story, options) {
    invariant(!author, TypeError, "Can't create a story: No author's ID given.")

    invariant(
      !isPlainObject(story), TypeError,
      "Story data should be passed as plain JavaScript object."
    )

    invariant(isEmpty(story), TypeError, "Story information is required.")

    invariant(isEmpty(story.chapter), TypeError, "Story chapter is required.")

    const chapter = await Chapter.createOne(story.chapter, 1)

    const short = nanoid()
    const full = `${limax(story.title)}.${short}`

    const slug = {
      short,
      full
    }

    if (isArray(story.coAuthors)) {
      // Get role codename for each co-author
      for (const [idx, coAuthor] of story.coAuthors.entries()) {
        story.coAuthors[idx].role = this.roles[coAuthor.role.toLowerCase()]
      }
    }

    return await super.createOne({...story, author, slug, chapter}, options)
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
   * Get story by short/full slug
   *
   * @param {string} slug
   *
   * @return {object}
   *
   * @throws {NotFound}
   */
  static async findOneBySlug(slug) {
    const story = await this.findOne()
      .where({
        $or: [
          {
            "slug.short": slug
          },
          {
            "slug.full": slug
          }
        ]
      })
      .exec()

    invariant(!story, NotFound, "Can't find the story with %s slug.", slug)

    return await story.toJS()
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
      for (const [idx, coAuthor] of this.coAuthors.entries()) {
        this.coAuthors[idx].role = this.__getRoleName(coAuthor.role)
      }
    }

    return story
  }
}

export default Story
