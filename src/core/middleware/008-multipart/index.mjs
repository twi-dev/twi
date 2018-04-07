import busboy, {isFile} from "then-busboy"
import {unlink} from "promise-fs"
import isFunction from "lodash/isFunction"
import isEmpty from "lodash/isEmpty"

import map from "core/helper/iterator/async/recursiveObjectMap"

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

  const body = await busboy(ctx.req)

  ctx.request.body = isFunction(processFile)
    ? await map(body, value => isFile(value) ? processFile(value) : value)
    : body

  await next()

  if (!isEmpty(body)) {
    delete ctx.request.body
  }

  await map(body, field => isFile(field) ? unlink(field.path) : field)
}

const configureMultipart = () => multipart()

export default configureMultipart

export {multipart} // tmp
