import {parse} from "then-busboy"
import {unlink} from "promise-fs"

const unlinkFile = ({path}) => unlink(path)

const methods = ["post", "put"]

async function multipart(ctx, next) {
  if (!methods.includes(ctx.method.toLowerCase())) {
    return next()
  }

  if (!ctx.is("multipart/form-data")) {
    return next()
  }

  const body = await parse(ctx.req)

  ctx.request.body = body

  await next()

  // Cleanup
  return Promise.all(Array.from(body.files().values()).map(unlinkFile))
    .catch(err => err.code !== "ENOENT" && Promise.reject(err))
}

export default multipart
