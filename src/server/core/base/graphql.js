import Schema from "parasprite"
import requireHelper from "require-dir"
import objectIterator from "server/core/helper/iterator/objectIterator"

const GRAPHQL_ROOT = `${process.cwd()}/server/graphql/resolve`

const normalizeRequire = val => (
  "__esModule" in val && val.default ? val.default : val
)

const mapQueries = Type => (config, name) => {
  console.log(name)

  return config
}

const setResolvers = Type => function mapResolvers(obj, cb, ctx = null) {
  for (const [name, config] of objectIterator.entries(obj)) {
    console.log(normalizeRequire(config).toString())
    // cb(null, name, obj)
  }

  return Type.end()
}

function makeSchema() {
  const resolvers = requireHelper(GRAPHQL_ROOT, {
    recurse: true
  })

  console.log(resolvers)

  let schema = Schema()

  schema = setResolvers(schema.query("Query"))(resolvers.query)

  console.log(schema)

  return schema
}

export default makeSchema()
