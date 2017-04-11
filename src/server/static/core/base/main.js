import Next from "next/dist/server"

import Server from "system/base/Server"
import controller from "system/base/controller"
import hanlde from "server/static/middleware"

import view from "./view"

const {routes, allowedMethods} = controller(
  `${process.cwd()}/server/static/controller`
)

async function main(dev, env) {
  const next = new Next({dev})
  const server = new Server("static", {dev, env})

  const exts = {render: view(next)}

  const middlewares = [
    hanlde(next.getRequestHandler()),
    routes(),
    allowedMethods()
  ]

  server.ext(exts).use(middlewares)

  await next.prepare()
  await server.listen()

  console.log(`Server ${server.name} listen ${server.addr}`)
}

export default main
