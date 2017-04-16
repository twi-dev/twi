import Koa from "koa"
import cors from "kcors"
import body from "koa-bodyparser"
import favicon from "koa-favicon"

import makeController from "server/core/base/controller"
import errorHandler from "server/core/middleware/errorHandler"
import logger from "server/core/middleware/logger"
import multipart from "server/core/middleware/multipart"

import {backend} from "server/core/helper/util/configure"

const TWI_ROOT = process.cwd()

const koa = new Koa()

const FAVICON_PATH = `${TWI_ROOT}/static/assets/img/icns/favicon/twi.ico`

const controller = makeController(`${TWI_ROOT}/server/api/controller`)

koa
  .use(errorHandler())
  .use(cors())
  .use(body())
  .use(multipart({ignorePaths: ["/graphql"]}))
  .use(logger())
  .use(favicon(FAVICON_PATH))
  .use(controller.allowedMethods())
  .use(controller.routes())


const {host, port, secure} = backend

export {koa as app, host, port, secure}
