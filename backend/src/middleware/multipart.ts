import {parse, Body} from "then-busboy"
import {Middleware} from "koa"

const multipart: Middleware = async (ctx, next) => {
  if (!ctx.is("multipart/form-data") || ctx.method.toLowerCase() !== "post") {
    return next()
  }

  // @ts-ignore
  ctx.request.body = await parse(ctx.req).then(Body.json)

  return next()
}

export default multipart
