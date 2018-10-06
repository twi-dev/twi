import listOf from "core/graphql/getFieldSelectionsList"

function selectFromGraphQLFields(target, name, descriptor) {
  const method = descriptor.value

  descriptor.value = function select(params = {}) {
    const query = method.call(this, params)
    const fields = params.node

    return fields ? query.select(listOf(fields)) : query
  }
}

export default selectFromGraphQLFields
