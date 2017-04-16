import Schema from "parasprite"
import requireHelper from "require-dir"
import isPlainObject from "lodash/isPlainObject"
import isEmpty from "lodash/isEmpty"

import objectIterator from "system/helper/iterator/sync/objectIterator"

const SCHEMA_ROOT = `${process.cwd()}/server/api/graphql/schema`

/**
 * Set resolver from config
 *
 * @param parasprite.Type t – one of schema root type or GraphQLObjectType
 * @param string name
 * @param object config
 *
 * @return parasprite.Type
 */
function setResolver(t, name, config) {
  const {resolve, args} = config

  if (resolve && !isPlainObject(resolve)) {
    throw new TypeError(
      "Resolvers are allowed only as configuration object. " +
      `Check out the "${name}" resolve declaration.`
    )
  }

  t = t.resolve({...resolve, name})

  for (const [key, arg] of objectIterator.entries(args)) {
    if (!isPlainObject(arg)) {
      throw new TypeError(
        "Arguments are allowed only as configuration object. " +
        `Check out the "${key}" argument declaration for "${name}" resolver.`
      )
    }

    t.arg(key, arg.type, arg.required) // set argument to resolver
  }

  return t.end()
}

/**
 * Add resolvers to given type of app schema
 *
 * @param parasprite.Type t – one of schema root type or GraphQLObjectType
 *
 * @return function
 */
function setResolvers(t, obj) {
  for (const [name, resolver] of objectIterator.entries(obj)) {
    t = setResolver(t, name, resolver)
  }

  return t.end()
}

/**
 * Describe GraphQL schema using parasprite chainable API
 *
 * @return graphql.GraphQLSchema
 */
function makeSchema() {
  const resolvers = requireHelper(SCHEMA_ROOT, {
    recurse: true
  })

  // Make parasprite.Schema instance to describe GraphQL schema for the app.
  let schema = Schema()

  // Add query resolvers if they exists
  if (isEmpty(resolvers.query)) {
    throw new TypeError(
      "GraphQL required an \"query\" document on schema."
    )
  }

  schema = setResolvers(schema.query("Query"), resolvers.query)

  // Add mutation resolvers if they exists
  if (!isEmpty(resolvers.mutation)) {
    schema = setResolvers(schema.mutation("Mutation"), resolvers.mutation)
  }

  return schema.end()
}

export default makeSchema()
