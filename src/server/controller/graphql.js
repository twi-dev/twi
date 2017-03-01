import {basename, extname} from "path"

import Router from "koa-router"
import {graphqlKoa, graphiqlKoa} from "graphql-server-koa"

import {isDev} from "server/core/helper/util/configure"
import noop from "server/core/middleware/noop"
import multipart from "server/core/middleware/multipart"

import Schema from "server/core/graphql"

import {
  // GraphQLSchema,
  // GraphQLObjectType as TObject,
  GraphQLString as TString,
  // GraphQLList
} from "graphql"

// Experimental chainable interface for GraphQL schema definitions.
//   Still in development. Shoul be moved as external package.
const schema = Schema()
  .query("SomeSchema", "Some random schema")
    .field("greet", TString)
      .resolve((_, {name}) => `Hello, ${name}!`)
        .arg("name", TString)
      .end()
    .end()
  .end()

// console.log(schema)

const processFiles = file => file

// Graphql endpoint name for GraphiQL
const endpointURL = `/${basename(module.filename, extname(module.filename))}`

// Graphiql handler. Will rendered only in "development" env
const actionGraphiQL = isDev ? graphiqlKoa({endpointURL}) : noop()

// GraphQL queries/mutations/subscriptions handler
const actionGraphQL = graphqlKoa(async context => ({
  schema, context
}))

const r = new Router()

r.get("/", actionGraphiQL)

r.all("/", multipart({processFiles}), actionGraphQL)

// Noop Ctor for GraphQL routes
function GraphQLController() {}

GraphQLController.prototype.router = r

export default GraphQLController
