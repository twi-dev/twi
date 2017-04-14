import Server from "system/base/Server"

import multipart from "server/api/middleware/multipart"

import view from "./view"

async function main(dev, env) {
  const server = new Server("api", {dev, env, port: 1337})

  const exts = {
    render: view({debug: false})
  }

  const middlewares = [
    multipart({ignorePaths: ["/graphql"]})
  ]

  server
    .ext(exts)
    .use(async ctx => ctx.body = "Hello, World!")
    .use(middlewares)

  await server.listen()

  console.log(`The ${server.name} has been started.`)
  console.log("Listening on http://localhost:1337")
}

export default main
