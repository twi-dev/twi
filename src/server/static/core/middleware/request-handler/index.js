const requestHandler = handler => async function(ctx, next) {
  await handler(ctx.req, ctx.res)

  ctx.status = 200

  await next()
}

export default requestHandler
