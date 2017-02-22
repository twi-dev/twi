import {basename, extname} from "path"

import Router from "koa-router"
import {makeExecutableSchema} from "graphql-tools"
import {graphqlKoa, graphiqlKoa} from "graphql-server-koa"

import {isDev} from "server/core/helper/util/configure"
import noop from "server/core/middleware/noop"

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

const actionGraphQL = graphqlKoa(async context => ({schema, context}))

const r = new Router()

r.get("/", actionGraphiQL)

r.all("/", actionGraphQL)

// Noop Ctor for GraphQL routes
function GraphQLController() {}

GraphQLController.prototype.router = r

export default GraphQLController
