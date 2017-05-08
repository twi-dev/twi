import mongoose, {Schema} from "mongoose"

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

// const models = new Map()

function createModel(Model, options = {}) {
  if (!isFunction(Model)) {
    throw new TypeError("Model should be implemented as class.")
  }

  const name = Model.name

  if (!isFunction(Model.getModelFields)) {
    throw new TypeError(
      `Required static method ${name}.getModelFields() { ... } on a model.`
    )
  }

  const schemaFields = Model.getModelFields(Types)

  if (!isPlainObject(schemaFields)) {
    throw new TypeError(
      `${name}.getModelFields method should return a plain object.`
    )
  }

  delete Model.getModelFields // remove this helper static method from a Model

  const schema = new Schema(schemaFields, options)

  schema.loadClass(Model)

  const model = mongoose.model(name, schema)

  // models.set(name, model)

  return model
}

// function createConnection(config = {}) {
//   const connectionString = ""

//   return mongoose.connect(connectionString)
// }

// export {createConnection}
export default createModel
