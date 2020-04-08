import isFunction from "lodash/isFunction"

import sequelize from "./connection"

const defaults = {
  underscored: true
}

/**
 * Creates a new model using given schema and options.
 * Implies a Model.init call to simplify models declaration.
 * Also, enhances default options
 *
 * @param {object | Function} schema
 * @param {object} options
 *
 * @return {Function} Target
 */
const createModel = (schema, options = {}) => Target => (
  Target.init(isFunction(schema) ? schema(Target) : schema, {
    ...defaults,
    ...options,

    hooks: do {
      if (isFunction(options.hooks)) {
        // Allow to pass hooks as a single function that returns the object
        options.hooks(Target, options)
      } else if (options.hooks != null) {
        // Ignore this rule since it's false-positive
        // eslint-disable-next-line no-unused-expressions
        options.hooks
      }
    },

    sequelize: options.sequelize ?? sequelize,
    tableName: options.tableName ?? Target.tableName
  })
)

export default createModel
