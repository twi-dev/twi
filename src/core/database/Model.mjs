import {Model as MongooseModel} from "mongoose"

import omit from "lodash/omit"
import merge from "lodash/merge"
import isPlainObject from "lodash/isPlainObject"
import invariant from "@octetstream/invariant"

import findKey from "core/helper/iterator/sync/objFindKey"
import deprecate from "core/helper/decorator/deprecate"
import getType from "core/helper/util/getType"

const isArray = Array.isArray

class Model extends MongooseModel {
  static get pubsub() {
    return invariant(true, "Should be implemented in a child class.")
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

    invariant(
      !isPlainObject(doc), TypeError,
      "Expected a plain object. Received %s", getType(doc)
    )

    return super.create(doc, this._getOptions(options))
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
      return this.createOne(docs, options)
    }

    if (docs.length === 1) {
      return this.createOne(docs.shift(), options)
    }

    return this.insertMany(docs, options)
  }

  /**
   * Find whatever documents. (10 per page)
   *
   * @param {object} search – advanced search parameters
   * @param {number} cursor – page number
   *
   * @return {array}
   */
  static findMany(search = {}, cursor = 1, limit = 10) {
    const skip = limit * (cursor - 1)

    return this.find().where(search).skip(skip).limit(limit)
  }

  /**
   * Find one document in collection by ID
   *
   * @param {string | mongoose.Types.ObjectId} id – document identifier in
   *   collection.
   *
   * @param {object} options
   */
  static findOneById(id, options) {
    return this.findById(id, this._getOptions(options))
  }

  // DEPRECATED
  @deprecate("Use findManyByIds instead")
  static findManyById(...args) {
    return this.findManyByIds(...args)
  }

  /**
   * Find some docs by IDs
   *
   * @param {array} ids – IDs of documents you are looking for
   *
   * @return {array}
   */
  static findManyByIds(ids, cursor, limit) {
    invariant(
      !isArray(ids), TypeError,

      "Documents IDs should be passed as array."
    )

    return this.findMany({_id: {$in: ids}}, cursor, limit)
  }

  /**
   * Remove one document by ID
   *
   * @param {string | mongoose.Types.ObjectId} id – ID of the document.
   *
   * @return {string | mongoose.Types.objectId}
   */
  static async removeOneById(id) {
    let doc = super.findById(id)

    invariant(!doc, "Can't find the document.")

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
