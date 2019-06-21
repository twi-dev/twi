import {parse, Body} from "then-busboy"
import {unlink} from "promise-fs"

import isEmpty from "lodash/isEmpty"

const toLowerCase = string => String.prototype.toLowerCase.call(string)

const unlinkFile = ({path}) => unlink(path)

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
  if (!isEmpty(body) && ctx.is("multipart/form-data")) {
    delete ctx.request.body

    return Promise.all(Array.from(body.files().values()).map(unlinkFile))
      .catch(err => err.code !== "ENOENT" && Promise.reject(err))
  }
}

export default multipart
