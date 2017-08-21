import http from "http"

import Koa from "koa"
import isInteger from "lodash/isInteger"
import isFunction from "lodash/isFunction"
import isPlainObject from "lodash/isPlainObject"
import deepFreeze from "deep-freeze"
import invariant from "@octetstream/invariant"

import objectIterator from "core/helper/iterator/sync/objectIterator"
import getHostname from "core/helper/util/getHostname"
import getType from "core/helper/util/getType"

const isArray = Array.isArray
const defineProperty = Object.defineProperty

class Server extends Koa {
  constructor(config = {}) {
    invariant(!config.port, TypeError, "Port is required.")

    invariant(!isInteger(config.port), TypeError, "Port should be an integer.")

    invariant(
      !isArray(config.session.secret), TypeError,
      "Session secret keys should be an array. Received %s",
      getType(config.session.secret)
    )

    super()

    this.keys = [
      ...config.session.secret
    ]

    // Private member
    this.__config = deepFreeze({
      ...config
    })

    // Binds
    this.use = this.use.bind(this)
  }

  // Get server name
  get name() {
    return this.config.name
  }

  // Get a port that will be listening by the server
  get port() {
    return this.config.port
  }

  // Get configured server address
  // Note: This is NOT an actual address that will be used by Node.js server
  get addr() {
    const {env, host, port, secure} = this.config

    return getHostname(host, port, secure, env.dev)
  }

  get config() {
    return this.__config
  }

  /**
   * @private
   */
  __extFromConfig = config => {
    invariant(
      !isPlainObject(config),
      "Extensions should be passed as s plsin JavaScript object " +
      "or as name and a funtion. See the Server#ext docs for more info."
    )

    for (const [key, value] of objectIterator.entries(config)) {
      defineProperty(this.context, key, {value})
    }

    return this
  }

  /**
   * Add milldeware to queue
   *
   * @see Koa.js docs tp get more information about middlewares
   *
   * @param {AsyncFunction|function|array} middleware – a function or a list
   *  of functions that will be added to Koa.js middleware queue
   *
   * @return {Server}
   */
  use(middlewares) {
    if (!isArray(middlewares)) {
      middlewares = [middlewares]
    }

    for (const [pos, middleware] of middlewares.entries()) {
      if (isFunction(middleware)) {
        super.use(middleware)
      } else if (isArray(middleware)) {
        const [fn, config] = middleware

        super.use(fn(config))
      } else {
        invariant(
          true, TypeError,
          "Each passed middleware should be a function or an array " +
          "with a function as the first element and a config object " +
          "as the second. Received %s at position %i",
          getType(middleware), pos
        )
      }
    }

    return this
  }

  /**
   * Extend Koa.js context with methods
   * This method allows you to extend a Koa.js context and use your function
   *   from it instance in middlewares.
   * @see src/server/api/core/base/view.js as working example.
   *
   * @param {string|object} – method name or palin object with sets of methods
   *   in format: {name: fn}
   *
   * @param {function} fn – handler that will extends Context
   *
   * @return {Server}
   *
   * @example
   * // So, after you've create a Server instance, you can extend Koa.js context
   * //  using this method if you want to use custiom methods from middlewares:
   *
   * // Note: "this" keyword in your extension will be point to Koa.js context
   * const greeter = (name = "Anon Pony") => this.body = `Hello, ${name}!`
   *
   * // I've recomended passing extensions as a plain object
   * //   of "name" => "fn" pair,
   * //   cuz this is more shorter way than passing "name" and "function"
   * //   as two different params.
   * server.ext({greeter})
   *
   * // ...and after that, you can use your extension from middlewares, like so:
   * async function greeterMiddleware(ctx, next) {
   *   ctx.greeter(ctx.query.name)
   *   await next()
   * }
   */
  ext = (name, fn) => (
    this.__extFromConfig(isPlainObject(name) ? name : {[name]: fn})
  )

  /**
   * Start server that will be listening on port from config.
   */
  listen = () => new Promise((resolve, reject) => {
    const server = http.createServer(this.callback())

    const onFulfilled = () => resolve(server)

    server
      .on("error", reject)
      .listen(this.port, onFulfilled)
  })
}

export default Server
