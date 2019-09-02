import isFunction from "lodash/isFunction"

import sequelize from "./connection"

const defaults = {
  createdAt: "created_at",
  updatedAt: "updated_at"
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
