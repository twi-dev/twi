import Schema, {Type} from "parasprite"

import requireHelper from "require-dir"
import isPlainObject from "lodash/isPlainObject"

import objectIterator from "server/core/helper/iterator/objectIterator"

const SCHEMA_ROOT = `${process.cwd()}/server/graphql/schema`

const normalizeRequire = val => (
  "__esModule" in val && val.default ? val.default : val
)

const makeResolverFromConfig = (type, name, config) => {
  type = type.resolve({...config.resolve, name})

  for (const [name, arg] of objectIterator.entries(config.args)) {
    type.arg(name, arg.type, arg.required)
  }

  return type
}

/**
 * Add resolvers to given type of app schema
 *
 * @param parasprite.Type type – one of schema root type or GraphQLObjectType
 *
 * @return function
 */
function setResolvers(type, obj) {
  const makeResolverFromFn = name => (...args) => {
    // Reserved for the future parasprite releases. Do not use it now.
    if (isPlainObject(args[0])) {
      return type.resolve({
        ...args[0], name
      })
    }

    return type.resolve(name, ...args)
  }

  for (const [name, resolver] of objectIterator.entries(obj)) {
    if (isPlainObject(resolver.args)) {
      type = makeResolverFromConfig(type, name, resolver)
    } else {
      const fn = normalizeRequire(resolver)

      type = fn(makeResolverFromFn(name))
    }

    type = type.end()

    if (!(type instanceof Type)) {
      throw new ReferenceError(
        `Inllegal .end() invocation in ${name} resolver module.`
      )
    }
  }

  return type.end()
}

function makeSchema() {
  const resolvers = requireHelper(SCHEMA_ROOT, {
    recurse: true
  })

  let schema = Schema()

  // Add query resolvers if their exists
  if (resolvers.query) {
    schema = setResolvers(schema.query("Query"), resolvers.query)
  }

  // Add mutation resolvers if their exists
  if (resolvers.mutation) {
    schema = setResolvers(schema.mutation("Mutation"), resolvers.mutation)
  }

  return schema.end()
}

export default makeSchema()
