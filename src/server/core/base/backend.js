import Koa from "koa"
import cors from "kcors"

import controller from "server/core/base/controller"
import errorHandler from "server/core/middleware/errorHandler"

import {backend} from "server/core/helper/util/configure"

const koa = new Koa()

koa
  .use(errorHandler())
  .use(cors())
  .use(controller.allowedMethods())
  .use(controller.routes())

const {host, port, secure} = backend

export {koa as app, host, port, secure}
