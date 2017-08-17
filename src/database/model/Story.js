import limax from "limax"
import isEmpty from "lodash/isEmpty"
import isPlainObject from "lodash/isPlainObject"
import invariant from "@octetstream/invariant"

import {createModel, Model} from "core/database"

import Chapter from "database/model/Chapter"

import NotFound from "core/error/http/NotFound"

import nanoid from "core/helper/util/nanoid"

const isArray = Array.isArray

@createModel
class Story extends Model {
  /**
   * Collaborators roles
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
   * @param {mongoose.Types.ObjectId|string} publisher – A user id which will
   *  be added as story publisher
   *
   * @param {object} story – story content
   *
   * @return {object} – created story
   */
  static async createOne(publisher, story, options) {
    invariant(
      !publisher, TypeError, "Can't create a story: No publisher's ID given."
    )

    invariant(
      !isPlainObject(story), TypeError,
      "Story data should be passed as plain JavaScript object."
    )

    invariant(isEmpty(story), TypeError, "Story information is required.")

    invariant(isEmpty(story.chapter), TypeError, "Story chapter is required.")

    const chapter = await Chapter.createOne(story.chapter)

    const chapters = {
      list: [chapter.id],
      count: 1
    }

    const short = nanoid()
    const full = `${limax(story.title)}.${short}`

    const slug = {
      short,
      full
    }

    if (isArray(story.collaborators)) {
      // Get role codename for each collaborator
      for (const [idx, collaborator] of story.collaborators.entries()) {
        const role = collaborator.role.toLowerCase()

        story.collaborators[idx].role = this.roles[role]
      }
    }

    return await super.createOne({...story, publisher, slug, chapters}, options)
  }

  // NOTE: Just an unallowed method
  static async createMany() {
    invariant(
      true,
      "This method is not allowed in this class. Use %s.createOne instead.",
      Story.name
    )
  }

  static async addOneChapter(creator, story, chapter, options = {}) {
    story = await this.findById(story)

    invariant(!story, NotFound, "Can't find requested story.")

    chapter = await Chapter.createOne(chapter, options)

    story.chapters.list.push(chapter.id)
    story.chapters.count = story.chapters.list.length

    await story.save()

    return chapter
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
  static async findManyByAuthor(author, cursor, options = {}) {
    return await super.findMany(cursor, {author}, undefined, options)
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

    invariant(!story, NotFound, "Can't find the story with slug: %s", slug)

    return await story.toJS()
  }

  /**
   * Get role name by the code.
   *
   * @param {number} code
   *
   * @return {string|undefined}
   *
   * @private
   */
  __getRoleName = role => this._findKey(Story.roles, role)

  /**
   * @see Model#toJS
   */
  async toJS(options) {
    // TODO: Add a collaborators population
    const story = await super.toJS(options)

    if (!isEmpty(this.collaborators)) {
      for (const [idx, collaborator] of this.collaborators.entries()) {
        this.collaborators[idx].role = this.__getRoleName(collaborator.role)
      }
    }

    return story
  }
}

export default Story
