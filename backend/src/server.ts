import {createServer, Server} from "http"

import Router from "@koa/router"
import cors from "@koa/cors"

import Koa from "koa"

let server: Server | null

const koa = new Koa()
const router = new Router()

koa
  .use(cors())
  .use(router.allowedMethods())
  .use(router.routes())

export const start = () => new Promise<Server>((resolve, reject) => {
  server = createServer(koa.callback())

  server
    .once("error", reject)
    .listen(process.env.SERVER_PORT, () => resolve(server))
})

export const stop = () => new Promise<void>((resolve, reject) => {
  server.close(error => error ? reject(error) : resolve())
})
