import {basename, extname} from "path"

import Router from "koa-router"

import {graphqlKoa, graphiqlKoa} from "graphql-server-koa"

import checkCtorCall from "core/helper/util/checkCtorCall"
import formatError from "core/graphql/formatError"
import schema from "core/graphql/schema"
import noop from "core/middleware/noop"
import config from "core/config"
import log from "core/log"

// GraphQL endpoint name for GraphiQL (based on current module name)
const endpointURL = `/${basename(module.filename, extname(module.filename))}`

// GraphiQL IDE handler. Will rendered only in "development" env
const actionGraphiQL = async function(ctx, next) {
  const {dev, debug, test} = config.env

  // Dirty hack -_-
  // Need to be improved
  // const subscriptionsEndpoint = (
  //   `ws://${ctx.app.addr.replace(/^.*:\/\//, "")}${endpointURL}`
  // )

  const middleware = (dev || debug || test)
    ? graphiqlKoa({
      endpointURL,
      // subscriptionsEndpoint
    })
    : noop()

  await middleware(ctx, next)
}

// GraphQL queries/mutations/subscriptions handler
const actionGraphQL = graphqlKoa(async context => ({
  schema, context, formatError
}))

const r = new Router()

// TODO: Move schema explorer to an external repo
r.get("/", actionGraphiQL)

r.all("/", actionGraphQL)

/**
 * @constructor
 */
function GraphQLController() {
  checkCtorCall(GraphQLController, this)
}

// Add GraphQL endpoint to GraphQLController
GraphQLController.prototype.router = r

const {server} = config

if (true) {
  log.info(
    "GraphiQL IDE will be mounted on http://%s:%s%s",
    server.host, server.port, endpointURL
  )
}

export default GraphQLController
