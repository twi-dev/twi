// Based on koajs/favicon
import {resolve, join, isAbsolute} from "path"

import {readFile} from "promise-fs"

import invariant from "@octetstream/invariant"
import isPlainObject from "lodash/isPlainObject"
import isString from "lodash/isString"
import ms from "ms"

import getType from "core/helper/util/getType"

const ROOT = process.cwd()

const DEFAULT_PATH = join(ROOT, "static/assets/img/icns/favicon/twi.ico")

function favicon(path = DEFAULT_PATH, options = {}) {
  if (isPlainObject(path)) {
    [options, path] = [path, DEFAULT_PATH]
  }

  invariant(
    !isString(path), TypeError,
    "Path should be a string. Received %s", getType(path)
  )

  invariant(
    !isPlainObject(options), TypeError,
    "Options sohuld be a plain object. Received %s", getType(options)
  )

  if (!isAbsolute(path)) {
    path = resolve(ROOT, path)
  }

  const maxAge = ms(options.maxAge != null ? options.maxAge : "1d")

  const cacheControl = (
    `public, max-age=${maxAge < 1000 ? maxAge / 1000 : 0}`
  )

  let icon = null
  return async function faviconMiddleware(ctx, next) {
    if (ctx.path !== "/favicon.ico") {
      return await next()
    }

    if (ctx.method !== "GET" && ctx.method !== "HEAD") {
      ctx.status = ctx.method === "OPTIONS" ? 200 : 405
      ctx.set("Allow", "GET, HEAD, OPTIONS")
      return
    }

    if (!icon) {
      icon = await readFile(path)
    }

    ctx.set("Cache-Control", cacheControl)
    ctx.type = "image/x-icon"
    ctx.body = icon
  }
}

const configureFavicon = () => favicon()

export default configureFavicon
