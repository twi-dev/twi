import http from "http"

import Koa from "koa"
import merge from "lodash/merge"
import isString from "lodash/isString"
import isInteger from "lodash/isInteger"
import isFunction from "lodash/isFunction"
import isPlainObject from "lodash/isPlainObject"

import objectIterator from "system/helper/iterator/sync/objectIterator"
import getType from "system/helper/util/getType"
import isListOf from "system/helper/typechecker/isListOf"
import getHostname from "system/helper/util/getHostname"

const isArray = Array.isArray

const defaults = {
  dev: false,
  test: false,
  debug: true,
  env: process.env.NODE_ENV || "development"
}

class Server extends Koa {
  constructor(name, config) {
    if (isPlainObject(name)) {
      config = name

      name = config.name

      delete config.name
    }

    config = merge({}, defaults, config)

    if (!name) {
      throw new TypeError(
        "The name is required for the Server instance. " +
        "Note: If you've passed config as first argument, " +
        "than you can set this argument as \"name\" property."
      )
    }

    if (!isString(name)) {
      throw new TypeError("Server name should be a string.")
    }

    if (!isInteger(config.port)) {
      throw new TypeError(`Port required for ${name} server.`)
    }

    super() // fucking ES6 OOP >_<

    this.__name = name
    this.__port = config.port
    this.__host = config.host
    this.__dev = config.dev

    // Binds
    this.use = this.use.bind(this)
  }

  // Get server name
  get name() {
    return this.__name
  }

  // Get a port that will be listening by the server
  get port() {
    return this.__port
  }

  // Get configured server address
  // Note: This is NOT an actual address that will be used by Node.js server
  get addr() {
    return getHostname(this.__host, this.__port, false)
  }

  //
  // Private
  //

  __extFromConfig = config => {
    for (const [key, value] of objectIterator.entries(config)) {
      Object.defineProperty(this.context, key, {value})
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
  listen = () => new Promise((resolve, reject) => (
    http
      .createServer(this.callback())
      .on("error", reject)
      .listen(this.__port, resolve)
  ))
}

export default Server
