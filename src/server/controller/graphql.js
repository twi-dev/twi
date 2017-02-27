import {basename, extname} from "path"

import Router from "koa-router"
import {makeExecutableSchema} from "graphql-tools"
import {graphqlKoa, graphiqlKoa} from "graphql-server-koa"

import {isDev} from "server/core/helper/util/configure"
import noop from "server/core/middleware/noop"
import multipart from "server/core/middleware/multipart"

import Schema from "server/core/graphql/schema"

import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLList
} from "graphql"

const _schema = Schema()
  .query("Foo", "Some random schema")
    .field("greet", GraphQLString)
      .resolve(async function(_, {name}) {
        return `Hello, ${name}!`
      }, {
        name: {
          type: GraphQLString
        }
      })
    .end()
  .end()

// console.log(_schema)

const endpointURL = `/${basename(module.filename, extname(module.filename))}`

// tmp schema
const schema = makeExecutableSchema({
  typeDefs: `
    type Query {
      greet(name: String): String!
    }

    schema {
      query: Query
    }
`,
  resolvers: {
    Query: {
      greet: async (_, {name}) => `Hello, ${name || "World"}!`
    }
  }
})
// end

const actionGraphiQL = isDev ? graphiqlKoa({endpointURL}) : noop()

const actionGraphQL = graphqlKoa(async context => ({
  schema: _schema, context
}))

const r = new Router()

r.get("/", actionGraphiQL)

r.all("/", multipart(), actionGraphQL)

// Noop Ctor for GraphQL routes
function GraphQLController() {}

GraphQLController.prototype.router = r

export default GraphQLController
