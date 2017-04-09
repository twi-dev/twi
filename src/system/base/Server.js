import http from "http"

import Koa from "koa"
import isString from "lodash/isString"
import isFunction from "lodash/isFunction"
import isPlainObject from "lodash/isPlainObject"

import objForEach from "common/helper/iterator/sync/objForEach"
import getType from "common/helper/util/getType"

const isArray = Array.isArray

class Server {
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

    this.__name = name
    this.__koa = new Koa()
    this.__port = config.port || 1337
  }

  get name() {
    return this.__name
  }

  //
  // Private
  //

  __extFromConfig = config => {
    objForEach(config, (name, fn) => this.__koa.context[name] = fn)

    return this
  }

  //
  // Public
  //

  use = middlewares => {
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
    middlewares.forEach(middleware => this.__koa.use(middleware))

    return this
  }

  ext = (name, fn) => (
    this.__extFromConfig(isPlainObject(name) ? name : {[name]: fn})
  )

  run = () => new Promise((resolve, reject) => {
    http
      .createServer(this.__koa.callback())
      .on("erorr", reject)
      .listen(this.__port, resolve)
  })
}

export default Server
