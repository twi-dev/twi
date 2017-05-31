import {resolve, join} from "path"

import camelCase from "camelcase"

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

const getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor

const getOwnPropertyNames = Object.getOwnPropertyNames

const schemasPath = resolve(__dirname, "..", "schema")

/**
 * Get all static values and getters results from given Model
 *
 * @param Function Model
 *
 * @return object
 */
function getStaticValues(Model) {
  const res = {}

  for (const name of getOwnPropertyNames(Model)) {
    if (/^(length|name|prototype)$/.test(name)) {
      continue
    }

    const descriptor = getOwnPropertyDescriptor(Model, name)

    if (isFunction(descriptor.get)) {
      res[name] = descriptor.get()
    } else if (!isFunction(descriptor.value)) {
      res[name] = descriptor.value
    }
  }

  return res
}

/**
 * Create a Mongoose model from given class.
 *
 * @param Function Target
 * @param object options
 *
 * @param object – mongoose model
 */
function createModel(Target, options = {}) {
  if (!isPrototypeOf(Model, Target)) {
    throw new TypeError("Target model should extend a class Model.")
  }

  const name = Target.name

  let getModelFields = null

  try {
    getModelFields = require(join(schemasPath, camelCase(Target.name))).default
  } catch (err) {
    if (err.code !== "MODULE_NOT_FOUND") {
      throw err
    }
  }

  if (!isFunction(getModelFields)) {
    getModelFields = Target.getModelFields

    // remove this helper static method from a Model
    delete Target.getModelFields
    delete Target.prototype.constructor.getModelFields
  }

  const values = getStaticValues(Target)

  const schemaFields = getModelFields(Types, values)

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
