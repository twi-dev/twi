import {parse, Body} from "then-busboy"
import {unlink} from "promise-fs"

import isEmpty from "lodash/isEmpty"

const toLowerCase = string => String.prototype.toLowerCase.call(string)

async function multipart(ctx, next) {
  if (["post", "put"].includes(toLowerCase(ctx.method)) === false) {
    return next()
  }

  if (!ctx.is("multipart/form-data")) {
    return next()
  }

  const body = await parse(ctx.req).then(Body.from)

  ctx.request.body = body

  await next()

  // Cleanup
  if (!isEmpty(body)) {
    delete ctx.request.body
  }

  return Promise.all(
    Array.from(body.files().values()).map(({path}) => unlink(path))
  ).catch(err => err.code !== "ENOENT" && Promise.reject(err))
}

export default multipart
