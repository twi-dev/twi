import {Model as MongooseModel} from "mongoose"

import isPlainObject from "lodash/isPlainObject"
import invariant from "@octetstream/invariant"

import findKey from "core/helper/iterator/sync/objFindKey"

const isArray = Array.isArray

class Model extends MongooseModel {
  /**
   * Create one document with given params
   *
   * @param {object} doc
   * @param {object|null|undefined} optinos
   *
   * @return {object}
   */
  static async createOne(doc, options) {
    invariant(
      !isPlainObject(doc), TypeError, "Document should be passed as object."
    )

    doc = await this(doc).save(options)

    return await doc.toJS()
  }

  /**
   * Create many documents with given params
   *
   * @param {array|object} docs
   * @param {object|null|undefined} optinos
   *
   * @return {object}
   */
  static async createMany(docs, options) {
    if (!isArray(docs)) {
      return await this.createOne(docs, options)
    }

    if (docs.length === 1) {
      return await this.createOne(docs.shift(), options)
    }

    docs = await this.insertMany(docs, options)

    return await Promise.all(docs.map(doc => doc.toJS()))
  }

  /**
   * Find whatever documents. (10 per page)
   *
   * @param {number} cursor – page number
   * @param {object} filters – advanced search parameters
   *
   * @return {array}
   */
  static async findMany(cursor = 0, filters = {}) {
    const docs = await this.find({...filters}).skip(cursor * 10).limit(10)

    return await Promise.all(docs.map(doc => doc.toJS()))
  }

  /**
   * Find some docs by IDs
   *
   * @param {array} ids – IDs of documents you are looking for
   *
   * @return {array}
   */
  static async findManyById(ids, cursor) {
    invariant(
      !isArray(ids), TypeError, "Documents IDs should be passed as array."
    )

    return await this.findMany(cursor, {_id: {$in: ids}})
  }

  /**
   * Find field key in target object
   *
   * @protected
   *
   * @param {object} target
   * @param {any} search
   *
   * @return {string}
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
  toJS = async options => {
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
