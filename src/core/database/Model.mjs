import {Model as MongooseModel} from "mongoose"

import merge from "lodash/merge"
import isEmpty from "lodash/isEmpty"
import isFunction from "lodash/isFunction"
import isPlainObject from "lodash/isPlainObject"
import invariant from "@octetstream/invariant"

import findKey from "core/helper/iterator/sync/objFindKey"
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
    return {
      toJS: false
    }
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
   * Convert documents to JavaScript plain object using toJS method of
   *   the each document.
   *
   * @param {mongoose.Document | mongoose.Document[]} docs
   * @param {object} [optinos = {}]
   *
   * @return {object}
   *
   * @protected
   */
  static async _tryConvert(docs, options = {}) {
    if (isEmpty(docs)) {
      return null
    }

    if (isEmpty(options)) {
      options = this._getOptions(options)
    }

    if (Boolean(options.toJS) === false) {
      return docs
    }

    if (!isArray(docs)) {
      return isFunction(docs.toJS) ? await docs.toJS() : docs
    }

    for (const [idx, doc] of docs.entries()) {
      docs[idx] = isFunction(doc.toJS) ? await doc.toJS() : doc
    }

    return Promise.all(docs)
  }

  /**
   * Create one document with given params
   *
   * @param {object} doc
   * @param {object} [optinos = {}]
   *
   * @return {object}
   */
  static async createOne(doc, options = {}) {
    options = this._getOptions(options)

    invariant(
      !isPlainObject(doc), TypeError,
      "Expected a plain object. Received %s", getType(doc)
    )

    doc = await this(doc).save(options)

    return this._tryConvert(doc, options)
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

    docs = await this.insertMany(docs, options)

    return this._tryConvert(docs, options)
  }

  /**
   * Find whatever documents. (10 per page)
   *
   * @param {number} cursor – page number
   * @param {object} filters – advanced search parameters
   *
   * @return {array}
   */
  static findMany(filters = {}, cursor = 1, limit = 10) {
    const skip = limit * (cursor - 1)

    return this.find().where(filters).skip(skip).limit(limit)
  }

  /**
   * Find one document in collection by ID
   *
   * @param {string | mongoose.Types.ObjectId} id – document identifier in
   *   collection.
   *
   * @param {object} options
   */
  static findOneById(id) {
    return this.findById(id)
  }

  // DEPRECATED
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
  static async removeManyById(ids) {
    await this.remove({
      _id: {
        $in: ids
      }
    })

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

  tryConvert = (docs, options = {}) => this._tryConvert(docs, options)

  /**
   * Converts a mongoose document to JavaScript plain object
   *
   * @param {object} [optinos = {}]
   *
   * @return {object}
   */
  async toJS(options = {}) {
    const obj = this.toObject({
      ...options, virtuals: true
    })

    const id = this.id

    return {
      ...obj, id
    }
  }
}

export default Model
