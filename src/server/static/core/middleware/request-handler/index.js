const requestHandler = handler => async function(ctx, next) {
  ctx.status = 200
  await handler(ctx.req, ctx.res)

  await next()
}

export default requestHandler
