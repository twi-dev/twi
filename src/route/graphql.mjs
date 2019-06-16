import {basename, extname} from "path"

import Router from "koa-router"

import {graphiqlKoa} from "graphql-server-koa"

// TOOD: Replace with direct import when they bring the middleware back
import {graphqlKoa} from "apollo-server-koa/dist/koaApollo"

import checkCtorCall from "core/helper/util/checkCtorCall"
import formatError from "core/graphql/formatError"
import schema from "core/graphql/schema"
import noop from "core/middleware/noop"
import config from "core/base/config"
import log from "core/log"

const {server, env} = config

// GraphQL endpoint name for GraphiQL (based on current module name)
const endpointURL = `/${basename(module.filename, extname(module.filename))}`

// const subscriptionsURL = join(endpointURL, "subscribe")

// GraphiQL IDE handler. Will rendered only in "development" env
const actionGraphiQL = async function(ctx, next) {
  const {dev, test} = env

  const middleware = dev && !test ? graphiqlKoa({endpointURL}) : noop()

  return middleware(ctx, next)
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

if (env.dev) {
  log.info("GraphiQL IDE will be mounted on %s%s", server.address, endpointURL)
}

export default GraphQLController
