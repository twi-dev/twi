import isFunction from "lodash/isFunction"

import sequelize from "./connection"

const createModel = (schema, options = {}) => Target => (
  Target.init(isFunction(schema) ? schema(Target) : schema, {
    ...options,

    sequelize: options.sequelize ?? sequelize,
    tableName: options.tableName ?? Target.tableName
  })
)

export default createModel
