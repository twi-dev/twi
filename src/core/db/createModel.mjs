import isFunction from "lodash/isFunction"

import sequelize from "./connection"

const defaults = {
  underscored: true
}

const createModel = (schema, options = {}) => Target => (
  Target.init(isFunction(schema) ? schema(Target) : schema, {
    ...defaults,
    ...options,

    sequelize: options.sequelize ?? sequelize,
    tableName: options.tableName ?? Target.tableName
  })
)

export default createModel
