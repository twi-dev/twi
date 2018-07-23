import {resolve, join, dirname} from "path"

import camelCase from "camelcase"

import mongoose from "mongoose"

import isEmpty from "lodash/isEmpty"
import isFunction from "lodash/isFunction"
import isPlainObject from "lodash/isPlainObject"

import invariant from "@octetstream/invariant"

import proxy from "core/helper/decorator/proxy"
import apply from "core/helper/proxy/selfInvokingClass"

import objectIterator from "core/helper/iterator/sync/objectIterator"

const assign = Object.assign

const Schema = mongoose.Schema
const Model = mongoose.Model

const Types = (() => {
  const res = {}

  for (const [name, type] of objectIterator(Schema.Types).entries()) {
    res[`T${name}`] = type
  }

  return assign({}, res, Schema.Types, {
    TObjectID: Schema.Types.ObjectId,
    ObjectID: Schema.Types.ObjectId
  })
})()

const isPrototypeOf = (parent, child) => (
  Object.prototype.isPrototypeOf.call(parent, child)
)

const getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor

const getOwnPropertyNames = Object.getOwnPropertyNames

const DATABASE_ROOT = resolve(__dirname, "..", "..", "database")

/**
 * Get all static values and getters results from given Model
 *
 * @param {Function} Model
 *
 * @return {object}
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
  const path = join(DATABASE_ROOT, "schema", camelCase(name))

  let module = null
  try {
    module = require(path)
  } catch (err) {
    invariant(err.code !== "MODULE_NOT_FOUND", err)

    invariant(
      true, "Can't find a schema for %s model. Expected module %s.js " +
      "at path %s", name, camelCase(name), dirname(path)
    )
  }

  const getModelFields = module.default

  invariant(
    !isFunction(getModelFields), TypeError,
    "Schema module should export a function as default." +
    "Check out the %s.js module exports.", path
  )

  const schemaFields = getModelFields(Types, values)

  invariant(
    !isPlainObject(schemaFields), TypeError,
    "Schema function should return a plain object." +
    "Check out the function %s in %s module.",
    getModelFields.name, path
  )

  const schema = new Schema({...schemaFields})

  return schema
}

function setMiddlewares(name, schema) {
  const path = join(DATABASE_ROOT, "middleware", camelCase(name))

  let middlewares = null
  try {
    middlewares = require(path)
  } catch (err) {
    invariant(err.code !== "MODULE_NOT_FOUND", err)
  }

  if (isEmpty(middlewares)) {
    return schema
  }

  invariant(
    !isPlainObject(middlewares), TypeError,

    "Middlewares module should export a plain object."
  )

  for (const {kind, type, parallel, handler} of objectIterator(middlewares)) {
    const args = [type]

    if (kind !== "post") {
      args.push(parallel)
    }

    schema[kind](...args, handler)
  }

  return schema
}

/**
 * Create a Mongoose model from given class.
 *
 * @param {Function} Target
 *
 * @param {Model} – mongoose model
 *
 * @api public
 */
function createModel(Target) {
  invariant(
    !isPrototypeOf(Model, Target), TypeError,
    "Target model should extend a class Model."
  )

  const name = Target.name

  const values = getStaticValues(Target)

  const schema = setMiddlewares(name, getSchema(name, values))

  // Also, make each models self-invocing.
  const model = proxy({apply})(mongoose.model(Target, schema))

  return model
}

export default createModel
