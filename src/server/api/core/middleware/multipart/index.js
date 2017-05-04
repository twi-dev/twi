import {Readable} from "stream"

import busboy from "then-busboy"
import pathToRegexp from "path-to-regexp"
import isFunction from "lodash/isFunction"
import isEmpty from "lodash/isEmpty"

import recursiveMap from "system/helper/iterator/sync/recursiveMap"

const defaults = {
  processFiles: false,
  ignorePaths: []
}

const multipart = options => async function(ctx, next) {
  if (ctx.method.toLowerCase() !== "post") {
    return await next()
  }

  if (!ctx.request.is("multipart/form-data")) {
    return await next()
  }

  const {processFiles, ignorePaths} = {...defaults, ...options}

  const filterPaths = path => pathToRegexp(path).test(ctx.url)

  if (!isEmpty(ignorePaths.filter(filterPaths))) {
    return await next()
  }

  let body = await busboy(ctx.req)

  if (isFunction(processFiles)) {
    body = recursiveMap(
      body, part => part instanceof Readable ? processFiles(part) : part
    )
  }

  ctx.request.body = body

  await next()
}

export default multipart
