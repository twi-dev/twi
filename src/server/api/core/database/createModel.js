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

const SCHEMAS_ROOT = resolve(__dirname, "..", "..", "database/schema")

/**
 * Get all static values and getters results from given Model
 *
 * @param Function Model
 *
 * @return object
 *
 * @api private
 */
function getStaticValues(Model) {
  const res = {}

  const names = getOwnPropertyNames(Model)

  for (const name of names) {
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

function getSchema(name, values) {
  const path = join(SCHEMAS_ROOT, camelCase(name))

  let module = null
  try {
    module = require(path)
  } catch (err) {
    if (err.code !== "MODULE_NOT_FOUND") {
      throw err
    }

    throw TypeError(
      `Can't found a schema for model ${name} at path ${path}.js`
    )
  }

  const getModelFields = module.default

  if (!isFunction(getModelFields)) {
    throw new TypeError(
      "Schema module should export a function as default."
    )
  }

  const schemaFields = getModelFields(Types, values)

  if (!isPlainObject(schemaFields)) {
    throw new TypeError(
      `Schema function ${getModelFields.name} should return a plain object.`
    )
  }

  const schema = new Schema({...schemaFields})

  return schema
}

/**
 * Create a Mongoose model from given class.
 *
 * @param Function Target
 * @param object options
 *
 * @param object – mongoose model
 *
 * @api public
 */
function createModel(Target) {
  if (!isPrototypeOf(Model, Target)) {
    throw new TypeError("Target model should extend a class Model.")
  }

  const values = getStaticValues(Target)

  const schema = getSchema(Target.name, values)

  const model = mongoose.model(Target, schema)

  return model
}

export default createModel
