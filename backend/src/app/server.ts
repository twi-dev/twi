import {createServer} from "http"
import {resolve} from "path"

import Koa from "koa"
import cors from "@koa/cors"
import serve from "koa-static"

import {Container} from "typedi"

import {FileStorage} from "helper/file/FileStorage"

import ormContext from "app/middleware/ormContext"
import multipart from "app/middleware/multipart"
import session from "app/middleware/session"
import createApolloServer from "app/graphql"

import {FileStorageFSDriver} from "app/file/FileStorageFSDriver"

async function startServer(): Promise<() => Promise<void>> {
  const server = createServer()
  const apolloServer = createApolloServer(server)
  const koa = new Koa()

  const fileStorage = new FileStorage(
    new FileStorageFSDriver(resolve("static"))
  )

  Container.set(FileStorage, fileStorage)

  koa.proxy = process.env.SERVER_TRUST_PROXY! === "true"
  koa.keys = process.env.SERVER_AUTH_SESSION_SECRET!.split(" ")

  await apolloServer.start()

  koa
    .use(cors())
    .use(serve(fileStorage.driver.ROOT))
    .use(session)
    .use(multipart)
    .use(ormContext)
    .use(apolloServer.getMiddleware({cors: false}))

  server.on("request", koa.callback())

  await new Promise<void>(resolve => server.listen(
    process.env.SERVER_PORT, resolve
  ))

  const address = `http://localhost:${process.env.SERVER_PORT}`

  console.log("Server is running on %s", address)

  if (process.env.NODE_ENV !== "production") {
    console.log(
      "GraphQL IDE is available on %s%s", address, apolloServer.graphqlPath
    )
  }

  return async function stopServer() {
    console.log("Stopping the server on %s", address)

    await apolloServer.stop()
  }
}

export default startServer
