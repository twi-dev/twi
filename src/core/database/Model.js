import {Model as MongooseModel} from "mongoose"

import merge from "lodash/merge"
import isEmpty from "lodash/isEmpty"
import isInteger from "lodash/isInteger"
import isPlainObject from "lodash/isPlainObject"
import invariant from "@octetstream/invariant"

import findKey from "core/helper/iterator/sync/objFindKey"
import getType from "core/helper/util/getType"

const isArray = Array.isArray

class Model extends MongooseModel {
  static get subscriptionTypes() {
    invariant(true, "Should be implemented in a child class.")
  }

  /**
   * @protected
   */
  static get _defaultOptions() {
    return {
      toJS: true
    }
  }

  /**
   * Get merged options object, based on given ones and defaults.
   *
   * @param {object|null|undefined} options
   *
   * @return {object}
   *
   * @protected
   */
  static _getOptions(options) {
    return merge({}, this._defaultOptions, (options || {}))
  }

  /**
   * Convert documents to JavaScript plain object using toJS method of
   *   the each document.
   *
   * @param {mongoose.Document|mongoose.Document[]} docs
   * @param {object|null|undefined} options
   *
   * @return {object}
   *
   * @protected
   */
  static async _tryConvert(docs, options = {}) {
    if (!docs) {
      return null
    }

    if (isEmpty(options)) {
      options = this._getOptions(options)
    }

    if (Boolean(options.toJS) === false) {
      return docs
    }

    return await (
      isArray(docs) ? Promise.all(docs.map(doc => doc.toJS())) : docs.toJS()
    )
  }

  /**
   * Create one document with given params
   *
   * @param {object} doc
   * @param {object|null|undefined} optinos
   *
   * @return {object}
   */
  static async createOne(doc, options = {}) {
    options = this._getOptions(options)

    invariant(
      !isPlainObject(doc), TypeError, "Document should be passed as object."
    )

    doc = await this(doc).save(options)

    return await this._tryConvert(doc, options)
  }

  /**
   * Create many documents with given params
   *
   * @param {array|object} docs
   * @param {object|null|undefined} optinos
   *
   * @return {object}
   */
  static async createMany(docs, options = {}) {
    options = this._getOptions(options)

    if (!isArray(docs)) {
      return await this.createOne(docs, options)
    }

    if (docs.length === 1) {
      return await this.createOne(docs.shift(), options)
    }

    docs = await this.insertMany(docs, options)

    return await this._tryConvert(docs, options)
  }

  static async findOne(filters, options = {}) {
    invariant(
      !isPlainObject(filters), TypeError,
      "Search rules object is requested. Received %s", getType(filters)
    )

    const doc = await super.findOne().where({...filters}).exec()

    return await this._tryConvert(doc, options)
  }

  /**
   * Find whatever documents. (10 per page)
   *
   * @param {number} cursor – page number
   * @param {object} filters – advanced search parameters
   *
   * @return {array}
   */
  static async findMany(cursor = 0, filters = {}, limit = 10, options = {}) {
    options = this._getOptions(options)

    if (isInteger(filters)) {
      [limit, filters] = [filters, {}]
    }

    if (isPlainObject(limit)) {
      [options, limit] = [limit, 10]
    }

    const docs = await this.find({...filters}).skip(cursor * limit).limit(limit)

    return await this._tryConvert(docs, options)
  }

  /**
   * Find some docs by IDs
   *
   * @param {array} ids – IDs of documents you are looking for
   *
   * @return {array}
   */
  static async findManyById(ids, cursor, filters, options = {}) {
    options = this._getOptions(options)

    invariant(
      !isArray(ids), TypeError, "Documents IDs should be passed as array."
    )

    if (isPlainObject(cursor)) {
      [filters, cursor] = [cursor, undefined]
    }

    return await this.findMany(cursor, {...filters, _id: {$in: ids}}, options)
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
   * @param {object|null|undefined} optinos
   *
   * @return {object}
   */
  async toJS(options) {
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
