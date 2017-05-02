import {join} from "path"

import Next from "next/dist/server"

import Server from "system/base/Server"
import makeRouter from "system/base/router"
import getConfig from "system/base/getConfig"

import hanlde from "static/core/middleware/request-handler"

import view from "./view"

const ROOT = process.cwd()

const buildRoutes = makeRouter(join(ROOT, "server/static/route"))

async function main(options) {
  const dev = options.env.dev

  const config = await getConfig(options.name, options.env)

  const next = new Next({dev})
  const server = new Server({...config, ...options})

  const r = buildRoutes({
    nonMatched: {
      get: hanlde(next.getRequestHandler())
    }
  })

  const render = view(next)

  const exts = {render}

  const middlewares = [
    r.routes(),
    r.allowedMethods()
  ]

  server.ext(exts).use(middlewares)

  await next.prepare()
  await server.listen()

  console.log(`Server ${server.name} listen ${server.addr}`)
}

export default main
