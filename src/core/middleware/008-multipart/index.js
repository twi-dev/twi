import busboy, {isFile} from "then-busboy"
import isFunction from "lodash/isFunction"
import isEmpty from "lodash/isEmpty"

import map from "core/helper/iterator/async/recursiveObjectMap"

const defaults = {
  processFile: false
}

const multipart = options => async function multipartParser(ctx, next) {
  if (ctx.method.toLowerCase() !== "post") {
    return await next()
  }

  if (!ctx.is("multipart/form-data")) {
    return await next()
  }

  const {processFile} = {...defaults, ...options}

  let body = await busboy(ctx.req)

  if (isFunction(processFile)) {
    body = await map(body, part => isFile(part) ? processFile(part) : part)
  }

  ctx.request.body = body

  await next()

  if (!isEmpty(body)) {
    delete ctx.request.body
  }
}

const configureMultipart = () => multipart()

export default configureMultipart
