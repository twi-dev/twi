import {basename, extname} from "path"

import Router from "koa-router"
import {graphqlKoa, graphiqlKoa} from "graphql-server-koa"

import {isDev} from "server/core/helper/util/configure"
import noop from "server/core/middleware/noop"
import multipart from "server/core/middleware/multipart"

import checkCtorCall from "server/core/helper/fallback/checkCtorCall"
import schema from "server/core/base/graphql"

/**
 * A function that transforms a file ReadableStream object
 *   to the File input type compatibility format
 *
 * @see: server/graphql/input/File
 *
 * @param stream.ReadableStream file
 *
 * @param Object
 */
const processFiles = ({originalName, path, mime, enc}) => ({
  originalName, path, mime, enc
})

// GraphQL endpoint name for GraphiQL (based on current module name)
const endpointURL = `/${basename(module.filename, extname(module.filename))}`

// GraphiQL IDE handler. Will rendered only in "development" env
const actionGraphiQL = isDev ? graphiqlKoa({endpointURL}) : noop()

// GraphQL queries/mutations/subscriptions handler
const actionGraphQL = graphqlKoa(async context => ({schema, context}))

const r = new Router()

r.get("/", actionGraphiQL)

r.all("/", multipart({processFiles}), actionGraphQL)

// Noop Ctor for GraphQL routes
function GraphQLController() {
  checkCtorCall(GraphQLController, this)
}

// Add GraphQL endpoints to GraphQLController
GraphQLController.prototype.router = r

export default GraphQLController
