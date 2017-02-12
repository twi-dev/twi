import Koa from "koa"
import cors from "kcors"
import serve from "koa-static"

import errorHandler from "server/core/middleware/errorHandler"
import {static as _static} from "server/core/helper/util/configure"

import view from "server/core/base/view"
import actionIndex from "server/core/base/frontend"

const STATIC_ROOT = `${process.cwd()}/static`

const koa = new Koa()

view(koa) // Add Pug view renderer to koa context

koa
  .use(errorHandler())
  .use(cors())
  .use(serve(STATIC_ROOT))
  .use(actionIndex)

const {host, port, secure} = _static

export {koa as app, host, port, secure}
