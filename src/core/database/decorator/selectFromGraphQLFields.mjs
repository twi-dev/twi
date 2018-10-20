import isEmpty from "lodash/isEmpty"

import listOf from "core/graphql/getFieldSelectionsList"

function selectFromGraphQLFields(target, name, descriptor) {
  const method = descriptor.value

  descriptor.value = function select(params = {}) {
    const query = method.call(this, params)
    const fields = params.node

    return isEmpty(fields) ? query : query.select(listOf(fields))
  }
}

export default selectFromGraphQLFields
