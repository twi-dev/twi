import listOf from "core/graphql/getFieldSelectionsList"

function selectFromGraphQLFields(target, name, descriptor) {
  const fn = descriptor.value

  descriptor.value = function select(params = {}) {
    const fields = params.node

    return fn.call(this, params).select(listOf(fields))
  }
}

export default selectFromGraphQLFields
