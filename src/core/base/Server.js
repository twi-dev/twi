import http from "http"

import Koa from "koa"
import isString from "lodash/isString"
import isInteger from "lodash/isInteger"
import isFunction from "lodash/isFunction"
import isPlainObject from "lodash/isPlainObject"
import deepFreeze from "deep-freeze"

import objectIterator from "core/helper/iterator/sync/objectIterator"
import isListOf from "core/helper/typechecker/isListOf"
import getHostname from "core/helper/util/getHostname"

const isArray = Array.isArray
const defineProperty = Object.defineProperty

class Server extends Koa {
  constructor(config = {}) {
    if (!config.port) {
      throw new TypeError(`Port required for ${config.name} server.`)
    }

    if (!isInteger(config.port)) {
      throw new TypeError("Given port should be an integer.")
    }

    super() // fucking ES6 OOP >_<

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

  //
  // Private
  //

  __extFromConfig = config => {
    for (const [key, value] of objectIterator.entries(config)) {
      defineProperty(this.context, key, {value})
    }

    return this
  }

  //
  // Public
  //

  /**
   * Add milldeware to queue
   *
   * @see Koa.js docs tp get more information about middlewares
   *
   * @param AsyncFunction|function|array middleware – a function or a list
   *  of functions that will be added to Koa.js middleware queue
   *
   * @return Server
   */
  use(middlewares) {
    if (!isArray(middlewares)) {
      middlewares = [middlewares]
    }

    if (!isListOf(middlewares, isFunction)) {
      throw new TypeError(
        "Middlewares argument should be a function or " +
        "an array of the functions."
      )
    }

    // Set up middlewares to Koa instance
    middlewares.forEach(middleware => super.use(middleware))

    return this
  }

  /**
   * Extend Koa.js context with methods
   * This method allows you to extend a Koa.js context and use your function
   *   from it instance in middlewares.
   * @see src/server/api/core/base/view.js as working example.
   *
   * @param string|object – method name or palin object with sets of methods
   *   in format: {name: fn}
   * @param fn – handler that will extends Context
   * @return Server
   *
   * Example:
   *
   * So, after you've create a Server instance, you can extend Koa.js context
   *   using this method if you want to use custiom methods from middlewares:
   *
   * ```js
   *   // Note: "this" keyword in your extension will be point to Koa.js context
   *   const greeter = (name = "Anon Pony") => this.body = `Hello, ${name}!`
   *
   *   // I've recomended passing extensions as a plain object
   *   //   of "name" => "fn" pair,
   *   //   cuz this is more shorter way than passing "name" and "function"
   *   //   as two different params.
   *   server.ext({greeter})
   * ```
   *
   * ...and after that, you can use your extension from middlewares, like so:
   *
   * ```js
   *  async function greeterMiddleware(ctx, next) {
   *    ctx.greeter(ctx.query.name)
   *    await next()
   *  }
   * ```
   *
   * TODO: Move an example from below to the docs or wiki.
   */
  ext = (name, fn) => (
    this.__extFromConfig(isPlainObject(name) ? name : {[name]: fn})
  )

  /**
   * Start server that will belistening on port from config.
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
