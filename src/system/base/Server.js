import http from "http"

import Koa from "koa"
import isString from "lodash/isString"
import isFunction from "lodash/isFunction"
import isPlainObject from "lodash/isPlainObject"

import objectIterator from "system/helper/iterator/sync/objectIterator"
import objForEach from "system/helper/iterator/sync/objForEach"
import getType from "system/helper/util/getType"

const isArray = Array.isArray

class Server extends Koa {
  constructor(name, config = {}) {
    if (isPlainObject(name)) {
      config = name
      name = config.name
    }

    if (!isString(name)) {
      throw new TypeError("Server name should be a string.")
    }

    if (!name) {
      throw new TypeError(
        "The name is required for the Server instance. " +
        "Note: If you've passed config as first argument, " +
        "than you can set this argument as \"name\" property."
      )
    }

    if (!config.port) {
      throw new TypeError(`Port required for ${name} server.`)
    }

    super() // fucking ES6 OOP >_<

    this.__name = name
    this.__port = config.port

    // Binds
    this.use = this.use.bind(this)
  }

  get name() {
    return this.__name
  }

  get port() {
    return this.__port
  }

  get addr() {
    return `http://localhost:${this.port}`
  }

  //
  // Private
  //

  __extFromConfig(config) {
    for (const [key, value] of objectIterator.entries(config)) {
      Object.defineProperty(this.context, key, {value})
    }

    return this
  }

  //
  // Public
  //

  use(middlewares) {
    if (isFunction(middlewares)) {
      middlewares = [middlewares]
    }

    if (!isArray(middlewares)) {
      throw new TypeError(
        "Middlewares argument should be a function or " +
        `an array of the functions, but given type is: ${getType(middlewares)}.`
      )
    }

    // Set up middlewares to Koa instance
    middlewares.forEach(middleware => super.use(middleware))

    return this
  }

  ext = (name, fn) => (
    this.__extFromConfig(isPlainObject(name) ? name : {[name]: fn})
  )

  listen = () => new Promise((resolve, reject) => (
    http
      .createServer(this.callback())
      .on("erorr", reject)
      .listen(this.__port, resolve)
  ))
}

export default Server
