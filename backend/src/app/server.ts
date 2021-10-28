import {createServer, Server} from "http"
import {resolve} from "path"

import Koa from "koa"
import cors from "@koa/cors"
import serve from "koa-static"

import {Container} from "typedi"

import {FileStorage} from "helper/file/FileStorage"

import waterfall from "helper/array/waterfall"

import ormContext from "app/middleware/ormContext"
import multipart from "app/middleware/multipart"
import session from "app/middleware/session"
import graphql from "app/graphql"

import {FileStorageFSDriver} from "app/file/FileStorageFSDriver"

let server: Server | undefined

async function init(): Promise<Koa> {
  const koa = new Koa()

  const fileStorage = new FileStorage(
    new FileStorageFSDriver(resolve("static"))
  )

  Container.set(FileStorage, fileStorage)

  koa.proxy = process.env.SERVER_TRUST_PROXY! === "true"
  koa.keys = process.env.SERVER_AUTH_SESSION_SECRET!.split(" ")

  await graphql.start()

  koa
    .use(cors())
    .use(serve(fileStorage.driver.ROOT))
    .use(session)
    .use(multipart)
    .use(ormContext)
    .use(graphql.getMiddleware({path: "/graphql"}))

  return koa
}

const run = (koa: Koa) => new Promise<Server>((resolve, reject) => {
  server = createServer(koa.callback())

  server
    .once("error", reject)
    .listen(parseInt(process.env.SERVER_PORT!, 10), () => resolve(server!))
})

export const start = () => waterfall([init, run]).then(() => {
  const address = `http://localhost:${process.env.SERVER_PORT}`

  console.log(`Server is running on ${address}`)
  console.log(`GraphiQL is mounted on ${address}/graphql`)
})

/**
 * Gracefully stops the server
 */
export const stop = () => new Promise<void>((resolve, reject) => {
  const fulfill = (error?: Error) => error ? reject(error) : resolve()

  if (!server) {
    return resolve()
  }

  if (!server.listening) {
    return resolve()
  }

  server.close(fulfill)
})
