import Server from "system/base/Server"

async function main(dev, env) {
  const server = new Server("api", {dev, env})

  await server.use(async ctx => ctx.body = "Hello, World!").listen()

  console.log("Listening on http://localhost:1337")
}

export default main
