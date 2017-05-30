import {resolve, join} from "path"

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

const schemasPath = resolve(__dirname, "..", "schema")

/**
 * Create a Mongoose model from given class.
 */
function createModel(Target, options = {}) {
  if (!isPrototypeOf(Model, Target)) {
    throw new TypeError("Target model should extend a class Model.")
  }

  const name = Target.name

  let getModelFields = null

  if (isFunction(Target.getModelFields)) {
    getModelFields = Target.getModelFields

    // remove this helper static method from a Model
    delete Target.getModelFields
  } else {
    getModelFields = require(join(schemasPath, Target.name)).default
  }

  // Check given function
  if (!isFunction(getModelFields)) {
    throw new TypeError(
      `Required static method ${name}.getModelFields() { ... } on a model. ` +
      "Or, it can also be described as an external module at: " +
      `${join(schemasPath, Target.name)}.js`
    )
  }

  const schemaFields = getModelFields(Types)

  if (!isPlainObject(schemaFields)) {
    throw new TypeError(
      `${name}.getModelFields method should return a plain object.`
    )
  }

  const schema = new Schema(schemaFields, options)

  const model = mongoose.model(Target, schema)

  return model
}

export default createModel
