import Schema, {Type} from "parasprite"

import requireHelper from "require-dir"
import isPlainObject from "lodash/isPlainObject"

import objectIterator from "server/core/helper/iterator/objectIterator"

const SCHEMA_ROOT = `${process.cwd()}/server/graphql/schema`

const normalizeRequire = val => (
  "__esModule" in val && val.default ? val.default : val
)

const setResolvers = type => function mapResolvers(obj) {
  let res = null

  const makeResolverFromFn = name => (...args) => {
    if (isPlainObject(args[0])) {
      return type.resolve({
        ...args[0], name
      })
    }

    return type.resolve(name, ...args)
  }

  for (const [name, config] of objectIterator.entries(obj)) {
    const fn = normalizeRequire(config)

    res = fn(makeResolverFromFn(name)).end()

    if (!(res instanceof Type)) {
      throw new ReferenceError(
        `Inllegal .end() invocation in ${name} resolver module.`
      )
    }
  }

  return res.end()
}

function makeSchema() {
  const resolvers = requireHelper(SCHEMA_ROOT, {
    recurse: true
  })

  let schema = Schema()

  // Add query resolvers if their exists
  if (resolvers.query) {
    schema = setResolvers(schema.query("Query"))(resolvers.query)
  }

  // Add mutation resolvers if their exists
  if (resolvers.mutation) {
    schema = setResolvers(schema.mutation("Mutation"))(resolvers.query)
  }

  return schema.end()
}

export default makeSchema()
