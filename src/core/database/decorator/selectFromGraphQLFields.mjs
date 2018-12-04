import {fieldsList} from "graphql-fields-list"

import isEmpty from "lodash/isEmpty"

function selectFromGraphQLFields(target, name, descriptor) {
  const method = descriptor.value

  descriptor.value = function select(params = {}) {
    const query = method.call(this, params)
    const node = params?.node

    return isEmpty(node) ? query : query.select(fieldsList(node))
  }
}

export default selectFromGraphQLFields
