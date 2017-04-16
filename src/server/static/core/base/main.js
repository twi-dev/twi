import Next from "next/dist/server"

import {static as _static} from "system/helper/util/configure"

import Server from "system/base/Server"
import makeController from "system/base/controller"

import hanlde from "static/core/middleware/request-handler"

import view from "./view"

const r = makeController(`${process.cwd()}/server/static/controller`)

const port = _static.port

async function main(dev, env) {
  const next = new Next({dev})
  const server = new Server("static", {dev, env, port})

  const exts = {render: view(next)}

  const middlewares = [
    // FIXME: To work with Koa router, I have to handle requests for next.js
    //  builtin paths
    hanlde(next.getRequestHandler()),
    r.routes(),
    r.allowedMethods()
  ]

  server.ext(exts).use(middlewares)

  await next.prepare()
  await server.listen()

  console.log(`Server ${server.name} listen ${server.addr}`)
}

export default main
