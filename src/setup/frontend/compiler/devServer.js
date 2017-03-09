import {createServer} from "http"

import Koa from "koa"
import cors from "kcors"
import serve from "koa-static"

import webpackHotMiddleware from "webpack-hot-middleware"
import webpackDevMiddleware from "webpack-dev-middleware"

import view from "server/core/base/view"
import actionIndex from "server/core/base/frontend"

const koa = new Koa()

/**
 * Improve webpack middlewares compatibility with Koa v2
 *
 * @param function callee
 * @param http.IncomingMessage
 * @param http.ServerResponse
 *
 * @return Promise
 */
function wrapExpressMiddleware(callee, req, res) {
  const end = res.end

  return new Promise((resolve, reject) => {
    // Mock an Express `next` callback
    const next = err => err == null ? resolve(true) : reject(err)

    res.end = function(...args) {
      end.apply(this, args)

      resolve(false) // Resolve `false` after `res.end` call
    }

    callee(req, res, next)
  })
}

/**
 * Webpack Dev Middleware for Koa v2
 *
 * @param Webpack compiler
 * @param object config
 *
 * @return async function
 */
function devMiddleware(compiler, config = {}) {
  const middleware = webpackDevMiddleware(compiler, config)

  return async function(ctx, next) {
    const hasNext = await wrapExpressMiddleware(middleware, ctx.req, {
      end(content) {
        ctx.body = content
      },

      setHeader(...args) {
        ctx.set(...args)
      }
    })

    if (hasNext) {
      await next()
    }
  }
}

/**
 * Webpack Hot Middleware for Koa v2
 *
 * @param Webpack compiler
 * @param object config
 *
 * @return async function
 */
function hotMiddleware(compiler, config = {}) {
  const middleware = webpackHotMiddleware(compiler, config)

  return async function(ctx, next) {
    const hasNext = await wrapExpressMiddleware(middleware, ctx.req, ctx.res)

    if (hasNext) {
      await next()
    }
  }
}

// tmp
async function logger({url, method, status, request: {ip}}, next) {
  console.log("%s -> %s %s", ip, method, url)
  await next()
  console.log("%s <- %s %s", ip, status, method, url)
}

/**
 * Make and return dev static server with webpack compiler
 *
 * @param Webpack compiler
 * @param object config
 *
 * @return http.Server
 */
function createDevServer(compiler, config = {}) {
  // Apply view renderer
  view(koa, {debug: false})

  koa
    .use(cors())
    .use(logger)
    .use(devMiddleware(compiler, config.devMiddleware))
    .use(hotMiddleware(compiler, config.hotMiddleware))
    .use(serve(config.devMiddleware.contentBase))
    .use(actionIndex)

  return createServer(koa.callback())
}

export default createDevServer
