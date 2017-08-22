import {join} from "path"

import {isType as isGraphQLType} from "graphql"

import Schema from "parasprite"
import invariant from "@octetstream/invariant"
import isPlainObject from "lodash/isPlainObject"
import isEmpty from "lodash/isEmpty"
import rd from "require-dir"

import objectIterator from "core/helper/iterator/sync/objectIterator"
import getType from "core/helper/util/getType"

const isArray = Array.isArray

const SCHEMA_ROOT = join(process.cwd(), "graphql/schema")

function setArgs(t, args, resolver) {
  invariant(
    !isPlainObject(args), TypeError,
    "Resolver arguments should be exported as plain object. Received %s",
    getType(args)
  )

  for (const entry of objectIterator.entries(args)) {
    const name = entry[0]
    let arg = entry[1]

    if (isGraphQLType(arg)) {
      arg = {
        type: arg,
        required: false
      }
    } else if (isArray(arg) && isGraphQLType(arg[0])) {
      arg = {
        type: arg[0],
        required: Boolean(arg[1])
      }
    } else if (!(isEmpty(arg) || isPlainObject(arg))) {
      invariant(
        true, TypeError,
        "Argument configuration is required if argument has been declared. " +
        "Allowed formats: any GraphQL type, an array or plain object. " +
        "Received %s. Check out a declaration of %s argument in %s resolver.",
        getType(arg), name, resolver
      )
    }

    t.arg(name, arg.type, arg.required)
  }
}

/**
 * Set resolver from config
 *
 * @param {parasprite.Type} t – one of schema root type or GraphQLObjectType
 * @param {string} name
 * @param {object} config
 *
 * @return parasprite.Type
 */
function setResolver(t, name, config) {
  const {resolve, args} = config

  invariant(
    (resolve && !isPlainObject(resolve)), TypeError,
    "Resolvers are allowed only as configuration object. " +
    "Check out the \"%s\" resolve declaration.", name
  )

  t = t.resolve({...resolve, name})

  if (!isEmpty(args)) {
    setArgs(t, args, name)
  }

  return t.end()
}

/**
 * Add resolvers to given type of app schema
 *
 * Note that you can ignore each of these resolver by adding .__ignore suffix
 *   to a filename or "ignore" (should be set to "true") field in a config.
 *
 * @param {parasprite.Type} t – one of schema root type or GraphQLObjectType
 *
 * @return {function}
 */
function setResolvers(t, obj) {
  for (const [name, resolver] of objectIterator.entries(obj)) {
    if (!(/\.__ignore__/.test(name) || resolver.ignore === true)) {
      setResolver(t, name, resolver)
    }
  }

  return t.end()
}

/**
 * Describe GraphQL schema using parasprite chainable API
 *
 * @return {graphql.GraphQLSchema}
 */
function makeSchema() {
  const resolvers = rd(SCHEMA_ROOT, {
    recurse: true
  })

  // Make parasprite.Schema instance to describe GraphQL schema for the app.
  let schema = Schema()

  invariant(
    isEmpty(resolvers.query), TypeError,
    "Query field is required for GraphQL schema."
  )

  schema = setResolvers(
    schema.query(
      "Shelves",
      "A Shelves type provides the root fields with available query resolvers."
    ),

    resolvers.query
  )

  // Add mutation resolvers if they exists
  if (!isEmpty(resolvers.mutation)) {
    schema = setResolvers(
      schema.mutation(
        "Spells",
        "A Spells type provides the root fields " +
        "with available mutation resolvers."
      ),

      resolvers.mutation
    )
  }

  // Add subscription resolvers if they exists
  if (!isEmpty(resolvers.subscription)) {
    schema = setResolvers(
      schema.subscription(
        "MagicFlow",
        "A MagicFlow type provides the root fields " +
        "with available subscription resolvers."
      ),

      resolvers.subscription
    )
  }

  return schema.end()
}

export default makeSchema()
