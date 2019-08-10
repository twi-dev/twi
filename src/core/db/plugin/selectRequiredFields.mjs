import bind from "core/helper/db/bindHookParams"

import isEmpty from "lodash/isEmpty"

function selectRequireFields(schema) {
  schema.pre(["find", "findOne"], bind(async query => {
    if (!isEmpty(query.model.requiredFields)) {
      query.select(query.model.requiredFields)
    }
  }))
}

export default selectRequireFields
