import isFunction from "lodash/isFunction"

import sequelize from "./connection"

const createModel = (schema, options) => Target => (
  Target.init(isFunction(schema) ? schema(Target) : schema, {
    sequelize: options.sequelize ? options.sequelize : sequelize
  })
)

export default createModel
