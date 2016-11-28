isXhr = (ctx, next) ->
  requestedWith = do ctx.request.get("x-requested-with").toLowerCase

  ctx.isXhr = requestedWith is "fetch"

  await do next

module.exports = isXhr
