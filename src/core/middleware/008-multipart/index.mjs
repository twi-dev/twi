import busboy, {isFile, Body} from "then-busboy"
import {unlink} from "promise-fs"
import isFunction from "lodash/isFunction"
import isEmpty from "lodash/isEmpty"

import map from "core/helper/iterator/async/recursiveObjectMap"
import waterfall from "core/helper/array/runWaterfall"

const toLowerCase = string => String.prototype.toLowerCase.call(string)

const defaults = {
  processFile: false
}

const multipart = options => async function multipartParser(ctx, next) {
  if (["post", "put"].includes(toLowerCase(ctx.method)) === false) {
    return next()
  }

  if (!ctx.is("multipart/form-data")) {
    return next()
  }

  const {processFile} = {...defaults, ...options}

  let body = await busboy(ctx.req).then(Body.from)

  if (isFunction(processFile)) {
    body = await map(body, value => isFile(value) ? processFile(value) : value)
  }

  ctx.request.body = body

  await next()

  if (!isEmpty(body)) {
    delete ctx.request.body
  }

  await map(body, field => isFile(field) ? unlink(field.path) : field)
}

const configureMultipart = () => multipart()

export default configureMultipart

export {multipart} // tmp
