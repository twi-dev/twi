import {GraphQLObjectType as Output} from "graphql"

// ! Not ready yet

/**
 * @param {Output} child
 * @param {Output} parent
 */
export function extendObjectType(child, parent) {
  const fields = {
    ...parent.getFields(),
    ...child.getFields()
  }

  return new Output({...child.toConfig, fields})
}
