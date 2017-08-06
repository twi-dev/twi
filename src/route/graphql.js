import {basename, extname} from "path"

import Router from "koa-router"
import {graphqlKoa, graphiqlKoa} from "graphql-server-koa"

import noop from "core/middleware/noop"

import checkCtorCall from "core/helper/util/checkCtorCall"

import multipart from "core/middleware/multipart"
import schema from "core/base/graphql"

/**
 * A function that transforms a file ReadableStream object
 *   to the TFile input type compatibility format
 *
 * @see: server/graphql/input/file/TInFile
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
const actionGraphiQL = async function(ctx, next) {
  const {dev, debug, test} = ctx.app.config.env

  const middleware = (dev || debug || test)
    ? graphiqlKoa({endpointURL})
    : noop()

  await middleware(ctx, next)
}

// GraphQL queries/mutations/subscriptions handler
const actionGraphQL = graphqlKoa(async context => ({schema, context}))

const r = new Router()

r.get("/", actionGraphiQL)

r.all("/", multipart({processFiles}), actionGraphQL)

/**
 * @constructor
 */
function GraphQLController() {
  checkCtorCall(GraphQLController, this)
}

// Add GraphQL endpoints to GraphQLController
GraphQLController.prototype.router = r

export default GraphQLController
