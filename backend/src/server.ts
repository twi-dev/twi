import {createServer, Server} from "http"

import cors from "@koa/cors"

import Koa from "koa"

import waterfall from "helper/array/waterfall"

import session from "middleware/session"
import getRouter from "router"

let server: Server | null = null

async function init(): Promise<Koa> {
  const koa = new Koa()

  koa.proxy = process.env.SERVER_TRUST_PROXY === "true"

  koa.keys = [process.env.SERVER_AUTH_SESSION_SECRET]

  const router = await getRouter()

  koa
    .use(cors())
    .use(session)
    .use(router.allowedMethods())
    .use(router.routes())

  return koa
}

const run = (koa: Koa) => new Promise<Server>((resolve, reject) => {
  server = createServer(koa.callback())

  server
    .once("error", reject)
    .listen(process.env.SERVER_PORT, () => resolve(server as Server))
})

export const start = () => waterfall([init, run])

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
