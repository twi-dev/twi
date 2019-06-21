import {basename, extname} from "path"
import {format} from "url"

import {Body} from "then-busboy"
// TOOD: Replace with direct import when they bring the middleware back
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

const extractFile = ({path, basename, extname, filename, mime, enc}) => ({
  path, basename, extname, filename, mime, enc
})

function extractFiles(ctx, next) {
  const {body} = ctx.request.body

  if (body instanceof Body) {
    ctx.request.body = Body.json([
      ...body.fields(), ...body.files().map(extractFile)
    ])
  }

  return next()
}

// GraphQL queries/mutations/subscriptions handler
const actionGraphQL = graphqlKoa(async context => ({
  schema, context, formatError
}))

const r = new Router()

// Mount IDE for dev environment
if (env.dev) {
  r.get("/", graphiqlKoa({endpointURL}))

  log.info(
    "GraphiQL IDE will be mounted on %s",
    format({host: server.url, pathname: endpointURL})
  )
}

r.post("/", extractFiles, actionGraphQL)

export default r
