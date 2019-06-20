import {basename, extname} from "path"

// TOOD: Replace with direct import when they bring the middleware back
import {Body} from "then-busboy"
import {graphiqlKoa} from "graphql-server-koa"
import {graphqlKoa} from "apollo-server-koa/dist/koaApollo"

import Router from "@koa/router"

import log from "core/log"
import config from "core/base/config"
import schema from "core/graphql/schema"
import formatError from "core/graphql/formatError"

const {server, env} = config

// GraphQL endpoint name for GraphiQL (based on current module name)
const endpointURL = `/${basename(__filename, extname(__filename))}`

// const subscriptionsURL = join(endpointURL, "subscribe")

// GraphQL queries/mutations/subscriptions handler
const actionGraphQL = graphqlKoa(async context => ({
  schema, context, formatError
}))

function processFiles(ctx, next) {
  let {body} = ctx.request

  body = [...body.fields(), ...body.files().map(file => ({...file}))]

  ctx.request.body = body

  return next()
}

const r = new Router()

// Mount IDE for dev environment
if (env.dev) {
  r.get("/", graphiqlKoa({endpointURL}))

  log.info("GraphiQL IDE will be mounted on %s%s", server.address, endpointURL)
}

r.post("/", processFiles, actionGraphQL)

export default r
