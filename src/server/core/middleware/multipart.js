import busboy from "then-busboy"

/**
 * Parse multipart/form-data body using then-busboy under the hood
 */
const multipart = () => async function multipart(ctx, next) {
  if (!ctx.request.is("multipart/form-data")) {
    return await next()
  }

  const data = await busboy(ctx.req)

  ctx.request.body = data

  await next()
}

export default multipart
