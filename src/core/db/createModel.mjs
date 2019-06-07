import isPlainObject from "lodash/isPlainObject"
import isFunction from "lodash/isFunction"
import mongoose from "mongoose"

const createModel = schema => Target => {
  if (isPlainObject(schema)) {
    schema = new mongoose.Schema(schema)
  }

  if (isFunction(schema)) {
    schema = schema(Target)
  }

  return mongoose.model(Target, schema)
}

export default createModel
