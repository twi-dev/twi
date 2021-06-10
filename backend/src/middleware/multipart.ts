import {parse, Body} from "then-busboy"
import {Middleware} from "koa"

const multipart: Middleware = async (ctx, next) => {
  if (
    ctx.get("content-type") !== "multipart/form-data" || ctx.method !== "post"
  ) {
    return next()
  }

  // @ts-ignore
  ctx.request.body = await parse(ctx.req).then(Body.json)

  return next()
}

export default multipart
