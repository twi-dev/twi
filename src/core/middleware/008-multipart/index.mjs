import busboy, {isFile} from "then-busboy"
import isFunction from "lodash/isFunction"
import isEmpty from "lodash/isEmpty"

import map from "core/helper/iterator/async/recursiveObjectMap"

console.log(isFile)

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

  let body = await busboy(ctx.req)

  if (isFunction(processFile)) {
    body = await map(
      body, async value => isFile(value) ? await processFile(value) : value
    )
  }

  ctx.request.body = body

  await next()

  if (!isEmpty(body)) {
    delete ctx.request.body
  }
}

const configureMultipart = () => multipart()

export default configureMultipart

export {multipart} // tmp
