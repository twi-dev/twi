import limax from "limax"
import isEmpty from "lodash/isEmpty"
import isPlainObject from "lodash/isPlainObject"
import invariant from "@octetstream/invariant"

import {createModel, Model} from "core/database"

import fromFields from "core/database/decorator/selectFromGraphQLFields"
import toObject from "core/database/decorator/toObject"

import Chapter from "database/model/Chapter"
// import Character from "database/model/Character"
// import Genre from "database/model/Genre"

import getFieldSelectionsList from "core/graphql/getFieldSelectionsList"

import NotFound from "core/error/http/NotFound"
import Forbidden from "core/error/http/Forbidden"

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
      editor: 4
    }
  }

  static getRole(name) {
    return this.roles[name.toLowerCase()]
  }

  @fromFields static _findById({args}) {
    return super.findById(args.id)
  }

  @toObject @fromFields static findMany({args}) {
    return super.findMany(args)
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
  @toObject static async createOne({args, ctx, options, ...params}) {
    const {story} = args

    const publisher = ctx.state.user.id

    invariant(
      !publisher, TypeError, "Can't create a story: No publisher's ID given."
    )

    invariant(
      !isPlainObject(story), TypeError,
      "Story data should be passed as plain JavaScript object."
    )

    invariant(isEmpty(story), TypeError, "Story information is required.")

    // Add chapters when they're given
    let chapters = null
    if (story.chapters) {
      const list = await Chapter.createMany({
        ...params, options, ctx, args: {chapters: story.chapters}
      })

      chapters = {
        list: list.map(({id}) => id),
        count: list.length
      }
    }

    const short = nanoid()
    const full = `${limax(story.title)}.${short}`

    const slug = {short, full}

    if (isArray(story.collaborators)) {
      // Get role codename for each collaborator
      for (const [idx, collaborator] of story.collaborators.entries()) {
        const role = collaborator.role.toLowerCase()

        story.collaborators[idx].role = this.roles[role]
      }
    }

    // Mark story as draft when there are no chapters created.
    const isDraft = isEmpty(chapters)

    return super.createOne({
      ...story, publisher, slug, chapters, isDraft
    }, options)
  }

  static async createMany() {
    invariant(
      true,
      "This method is not allowed in this class. Use %s.createOne instead.",
      Story.name
    )
  }

  @toObject static async addOneChapter({args, options, ...params}) {
    let {story} = args

    story = await this.findById({args: story.id})

    invariant(!story, NotFound, "Can't find requested story.")

    const chapter = await Chapter.createOne({...params, args, options})

    // story.chapters.list.push(chapter.id)
    // story.chapters.count = story.chapters.list.length

    // await story.save()

    await story.update({
      $inc: {
        "chapters.count": 1
      },
      $push: {
        "chapters.list": chapter.id
      }
    })

    return chapter
  }

  /**
   * Add a new collaborator to the story
   *
   * @param {string | mongoose.Types.ObjectId} viewer – the current user ID
   * @param {string | mongoose.Types.ObjectId} story – story ID
   * @param {string | mongoose.Types.ObjectId} user – ID of a new collaborator
   * @param {string} role – role of a new collaborator
   * @param {object} [options = {}]
   *
   * @return {object | mongoose.Document}
   *
   * @throws {NotFound} – when no story has found by given ID
   * @throws {Forbidden} – if the current user is not story publisher
   */
  @toObject static async addOneCollaborator(params) {
    const {args, ctx} = params
    const {collaborator} = args

    const viewer = ctx.state.user.id

    const story = await this._findById(params)

    invariant(!story, NotFound, "Can't find requested story.")

    invariant(
      !this.isPublisher(viewer), Forbidden,

      "You have not access for this operation. " +
      "Only the story publisher can update title."
    )

    collaborator.role = this.getRole(collaborator.role)

    await story.update({collaborators: {$push: collaborator}})

    return this._findById(params)
  }

  // static async addOneVote(user, story, vote, options = {}) {}

  /**
   * Update story title
   *
   * @param {string | mongoose.Types.ObjectId} viewer – the current user ID
   * @param {string | mongoose.Types.ObjectId} story – story ID
   * @param {string} title – the new title for story
   * @param {object} [options = {}]
   *
   * @return {object | mongoose.Document}
   *
   * @throws {NotFound} – when no story has found by given ID
   * @throws {Forbidden} – if the current user is not story publisher
   */
  static async updateOneTitle({args, ctx, node, options}) {
    const selections = getFieldSelectionsList(node)

    const {id, title} = args
    const viewer = ctx.state.user.id

    let story = await this.findById({node, args: {id}})

    invariant(!story, NotFound, "Can't find requested story.")

    invariant(
      !this.isPublisher(viewer), Forbidden,

      "You have not access for this operation. " +
      "Only the story publisher can update title."
    )

    await story.update({title})

    story = story.findById(id).select(selections)

    return this._tryConvert(story, options)
  }

  static async updateOneDescription({args, options, ctx, ...params}) {
    const viewer = ctx.state.user.id

    const {id, description} = args.story

    const story = await this.findById({...params, args: {id}})

    invariant(!story, NotFound, "Can't find requested story.")

    invariant(
      !this.isPublisher(viewer), Forbidden,
      "You have not access for this operation. " +
      "Only the story publisher can update description."
    )

    await story.update({description})

    return this.findById({...params, options, args: {id}})
  }

  @toObject static async updateOneStatus({args, options, ...params}) {
    const viewer = args.state.user.id

    let isFinished = args.story.isFinished

    isFinished || (isFinished = false)

    const story = await this._findById({...params, args: args.story})

    invariant(!story, NotFound, "Can't find requested story.")

    invariant(
      !this.isPublisher(viewer), Forbidden,

      "You have not access for this operation. " +
      "Only the story publisher can update status."
    )

    await story.update({isFinished})

    return this._findById({...params, args: args.story})
  }

  // static async updateOneType(viewer, story, translation, options = {}) {}

  /**
   * Find stories created by given publisher
   *
   * @param {string} publisher – ID of an publisher
   *   which stories you are looking for
   *
   * @return {object}
   *
   * @throws {NotFound} – if no stories created by this user founded
   */
  static async findManyByPublisher(publisher, cursor, options = {}) {
    return super.findMany(cursor, {publisher}, undefined, options)
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
  static async findOneBySlug(slug, options = {}) {
    const story = await this.findOne({
      $or: [
        {
          "slug.short": slug
        },
        {
          "slug.full": slug
        }
      ]
    })

    invariant(!story, NotFound, "Can't find the story with slug: %s", slug)

    return this._tryConvert(story, options)
  }

  static async removeOne(viewer, story) {
    story = await this.findOneById(story, {
      toJS: false
    })

    invariant(!story, NotFound, "Can't find requested story.")

    invariant(
      !story.isPublisher(viewer), Forbidden,
      "Only the story publisher have an access to remove it."
    )

    story = await story.remove()

    return story.id
  }

  // static async removeManyById(viewer, stories) {}

  // static async removeOneChapter(viewer, chapter) {}

  // static async removeOneCollaborator(viewer, story, user, options = {}) {}

  // static async removeOneCharacter(viewer, story, character, options = {}) {}

  // static async removeOneGenre(viewer, story, genre, options = {}) {}

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

  isPublisher(viewer) {
    return String(viewer) === String(this.publisher)
  }

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
