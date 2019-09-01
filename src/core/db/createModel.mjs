import isFunction from "lodash/isFunction"

import sequelize from "./connection"

const createModel = (schema, options = {}) => Target => (
  Target.init(isFunction(schema) ? schema(Target) : schema, {
    ...options, sequelize: options.sequelize ? options.sequelize : sequelize
  })
)

export default createModel
