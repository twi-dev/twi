import {Model as MongooseModel} from "mongoose"

import isPlainObject from "lodash/isPlainObject"
import invariant from "@octetstream/invariant"

const isArray = Array.isArray

class Model extends MongooseModel {
  /**
   * Create one document with given params
   *
   * @return object
   */
  static async createOne(doc, options) {
    invariant(
      !isPlainObject(doc), TypeError, "Document should be passed as object."
    )

    doc = await this(doc, options).save()

    return await doc.toJS()
  }

  /**
   * Create many documents with given params
   *
   * @return object
   */
  static async createMany(docs, options) {
    if (!isArray(docs)) {
      return await this.createOne(docs, options)
    }

    docs = await this.insertMany(docs, options)

    return await Promise.all(docs.map(doc => doc.toJS()))
  }

  /**
   * Find some docs by IDs
   *
   * @param array ids – IDs of documents you are looking for
   *
   * @return array
   */
  static async getManyById(ids) {
    invariant(
      !isArray(ids), TypeError, "Documents IDs should be passed as array."
    )

    const docs = await this.find().where({_id: {$in: ids}}).exec()

    return await Promise.all(docs.map(doc => doc.toJS()))
  }

  /**
   * Get an ID of the current Model instance.
   *
   * @return mongoose.Schema.Types.ObjectId
   */
  get id() {
    return this._id
  }

  async toJS(...args) {
    const obj = this.toObject(...args)
    const id = this.id

    return {
      ...obj, id
    }
  }
}

export default Model
