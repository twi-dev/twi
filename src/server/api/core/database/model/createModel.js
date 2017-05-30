import mongoose, {Schema, Model} from "mongoose"

import isFunction from "lodash/isFunction"
import isPlainObject from "lodash/isPlainObject"

import objectIterator from "system/helper/iterator/sync/objectIterator"

const Types = (() => {
  const res = {}

  for (const [name, type] of objectIterator.entries(Schema.Types)) {
    res[`T${name}`] = type
  }

  return res
})()

const isPrototypeOf = (parent, child) => (
  Object.prototype.isPrototypeOf.call(parent, child)
)

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

export default createModel
