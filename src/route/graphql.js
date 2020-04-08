import p from "path"

import {format} from "url"

import {Body} from "then-busboy"
// TOOD: Replace with direct import when they bring the middleware back
import {graphqlKoa} from "apollo-server-koa/dist/koaApollo"
import {renderPlaygroundPage} from "graphql-playground-html"

import toObject from "object-deep-from-entries"
import Router from "@koa/router"
import ms from "ms"

import log from "lib/log"
import config from "lib/base/config"
import schema from "lib/graphql/schema"
import formatError from "lib/graphql/formatError"

const {server, env} = config

// GraphQL endpoint name for GraphiQL (based on current module name)
const endpoint = `/${p.basename(__filename, p.extname(__filename))}`

const extractFile = (prev, [path, file]) => ([
  ...prev,

  [[...path, "path"], file.path],
  [[...path, "basename"], file.basename],
  [[...path, "extname"], file.extname],
  [[...path, "filename"], file.filename],
  [[...path, "mime"], file.mime],
  [[...path, "enc"], file.enc]
])

function extractFiles(ctx, next) {
  const {body} = ctx.request.body

  if (body instanceof Body) {
    ctx.request.body = toObject([
      ...body.fields.entries(),
      ...body.files.entries().reduce(extractFile)
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
  r.get("/", ctx => {
    ctx.body = renderPlaygroundPage({
      endpoint,
      settings: {
        "schema.polling.interval": ms("1 minute")
      }
    })
  })

  log.info(
    "GraphQL Playground IDE will be mounted on %s",
    format({host: server.url, pathname: endpoint})
  )
}

r.post("/", extractFiles, actionGraphQL)

export default r
