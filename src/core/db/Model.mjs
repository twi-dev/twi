import mongoose from "mongoose"

import omit from "lodash/omit"
import merge from "lodash/merge"
import freeze from "js-flock/deepFreeze"
import invariant from "@octetstream/invariant"

import findKey from "core/helper/iterator/sync/objFindKey"

const {Model} = mongoose

const isArray = Array.isArray

class BaseModel extends Model {
  /**
   * A list of the required fields that must be appeared in .select method
   */
  static alwaysSelect = freeze([])

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
   * Create many documents with given params
   *
   * @param {object[] | object} docs
   * @param {object} [optinos = {}]
   *
   * @return {mongoose.Document}
   */
  static async createMany(docs, options = {}) {
    options = this._getOptions(options)

    if (!isArray(docs)) {
      return BaseModel.create.call(this, docs, options).then(Array.of)
    }

    if (docs.length === 1) {
      return BaseModel.create.call(this, docs[0], options).then(Array.of)
    }

    return this.insertMany(docs, options)
  }

  /**
   * Find some docs by IDs
   *
   * @param {array} ids – IDs of documents you are looking for
   *
   * @return {mongoose.Query}
   */
  static findManyByIds(ids) {
    return this.find().where({_id: {$in: ids}})
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

export default BaseModel
