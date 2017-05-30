import mongoose, {Schema, Model as MongooseModel} from "mongoose"

import isFunction from "lodash/isFunction"
import isPlainObject from "lodash/isPlainObject"

import objectIterator from "system/helper/iterator/sync/objectIterator"

const isPrototypeOf = (parent, child) => (
  Object.prototype.isPrototypeOf.call(parent, child)
)

mongoose.Promise = Promise

const Types = (() => {
  const res = {}

  for (const [name, type] of objectIterator.entries(Schema.Types)) {
    res[`T${name}`] = type
  }

  return res
})()

class Model extends MongooseModel {
  /**
   * Get field that will be used for schema of the current Model.
   *
   * @param object Types – object of Mongoose types
   *
   * @return object – an object of the fields
   *
   * @access public
   * @static
   */
  static getModelFields = () => {
    throw new TypeError(
      "This method should be implemented on a child model."
    )
  }

  /**
   * Get an ID of the current Model instance.
   *
   * @return mongoose.Schema.Types.ObjectId
   */
  get id() {
    return this._id
  }

  /**
   * This method is just an alias for mongoose.Schema#toObject,
   *   but use can customize this method safely,
   *   because it will not be used by Mongoose.
   *
   * @access protected
   */
  _toJS(...args) {
    const obj = this.toObject(...args)
    const id = this.id

    const idKey = "_id"
    delete obj[idKey]

    return {
      ...obj, id
    }
  }

  toJS(...args) {
    return this._toJS(...args)
  }
}

/**
 * Create a Mongoose model from given class.
 */
function createModel(Target, options = {}) {
  if (!isPrototypeOf(Model, Target)) {
    throw new TypeError("Target model should extend a class Model.")
  }

  const name = Target.name

  if (!isFunction(Target.getModelFields)) {
    throw new TypeError(
      `Required static method ${name}.getModelFields() { ... } on a model.`
    )
  }

  const schemaFields = Target.getModelFields(Types)

  if (!isPlainObject(schemaFields)) {
    throw new TypeError(
      `${name}.getModelFields method should return a plain object.`
    )
  }

  delete Target.getModelFields // remove this helper static method from a Model

  const schema = new Schema(schemaFields, options)

  const model = mongoose.model(Target, schema)

  return model
}

async function createConnection(config = {}) {
  const replicaUri = `${config.host}:${config.port}/${config.name}`

  return await mongoose.connect(replicaUri)
}

export {createConnection, createModel, Model}
