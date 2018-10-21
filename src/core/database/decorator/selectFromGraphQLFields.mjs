import isEmpty from "lodash/isEmpty"

import fromFieldsOf from "core/graphql/getFieldSelectionsList"

function selectFromGraphQLFields(target, name, descriptor) {
  const method = descriptor.value

  descriptor.value = function select(params = {}) {
    const query = method.call(this, params)
    const node = params?.node

    return isEmpty(node) ? query : query.select(fromFieldsOf(node))
  }
}

export default selectFromGraphQLFields
