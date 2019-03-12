import {Model as Base} from "mongoose"

import omit from "lodash/omit"
import merge from "lodash/merge"
import isPlainObject from "lodash/isPlainObject"
import invariant from "@octetstream/invariant"

import findKey from "core/helper/iterator/sync/objFindKey"
import getType from "core/helper/util/getType"

const isArray = Array.isArray

class Model extends Base {
  /**
   * Returns keys of PubSub event types
   *
   * @return {object}
   */
  static get pubsub() {
    return invariant(true, "Must be implemented in a child class.")
  }

  /**
   * @protected
   */
  static get _defaultOptions() {
    return {}
  }

  /**
   * Get merged options object, based on given ones and defaults.
   *
   * @param {object} [optinos = {}]
   *
   * @return {object}
   *
   * @protected
   */
  static _getOptions(options) {
    return merge({}, this._defaultOptions, options)
  }

  /**
   * Create one document with given params
   *
   * @param {object} doc
   * @param {object} [optinos = {}]
   *
   * @return {object}
   */
  static async createOne(doc, options) {
    options = this._getOptions(options)

    if (!isPlainObject(doc)) {
      return invariant.reject(
        true, TypeError, "Expected plain object. Received %s", getType(doc)
      )
    }

    return super.create(doc, options)
  }

  /**
   * Create many documents with given params
   *
   * @param {array | object} docs
   * @param {object} [optinos = {}]
   *
   * @return {object}
   */
  static async createMany(docs, options = {}) {
    options = this._getOptions(options)

    if (!isArray(docs)) {
      return Model.createOne.call(this, docs, options).then(Array.of)
    }

    if (docs.length === 1) {
      return Model.createOne.call(this, docs[0], options).then(Array.of)
    }

    return this.insertMany(docs, options)
  }

  /**
   * Find whatever documents. (10 per page)
   *
   * @param {object} search – advanced search parameters
   * @param {number} cursor – page number
   *
   * @return {mongoose.Query}
   */
  static findMany(search = {}, cursor = 1, limit = 10) {
    if (typeof search === "number") {
      [cursor, limit, search] = [search, cursor, {}]
    }

    const skip = limit * (cursor - 1)

    return this.find().where(search).skip(skip).limit(limit)
  }

  /**
   * Find one document in collection by ID
   *
   * @param {string | mongoose.Types.ObjectId} id – document identifier in
   *   collection.
   *
   * @param {mongoose.Query} options
   */
  static findOneById(id, options) {
    return this.findById(id, this._getOptions(options))
  }

  /**
   * Find some docs by IDs
   *
   * @param {array} ids – IDs of documents you are looking for
   *
   * @return {mongoose.Query}
   */
  static findManyByIds(ids, cursor, limit) {
    return this.findMany(cursor, limit).where({_id: {$in: ids}})
  }

  /**
   * Remove one document by ID
   *
   * @param {string | mongoose.Types.ObjectId} id – ID of the document.
   *
   * @return {string | mongoose.Types.objectId}
   */
  static async removeOneById(id) {
    let doc = await super.findById(id)

    if (!doc) {
      return invariant.reject(true, "Can't find the document.")
    }

    doc = await doc.remove()

    return doc.id
  }

  /**
   * Remove multiple documents from the current collection.
   *
   * @param {string[] | mongoose.Types.ObjectId[]} ids – IDs of the documents.
   *
   * @return {string[] | mongoose.Types.objectId[]}
   */
  static async removeManyByIds(ids) {
    await super.remove({_id: {$in: ids}})

    return ids
  }

  /**
   * Find field key in target object
   *
   * @param {object} target
   * @param {any} search
   *
   * @return {string}
   *
   * @protected
   */
  _findKey = (target, search) => findKey(target, val => val === search)

  /**
   * Get an ID of the current Model instance.
   *
   * @return mongoose.Schema.Types.ObjectId
   */
  get id() {
    return this._id
  }

  /**
   * Converts a mongoose document to JavaScript plain object
   *
   * @param {object} [optinos = {}]
   *
   * @return {object}
   */
  async toJS(options = {}) {
    const object = super.toObject({...options, virtuals: true})

    return {...omit(object, ["_id", "__v"]), id: String(this.id)}
  }
}

export default Model
