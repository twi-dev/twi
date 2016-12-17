# Serve index page
actionIndex = (ctx, next) ->
  return await do next if ctx.method isnt "GET" or ctx.url isnt "/"
  await ctx.render "layout/root"

actionOutdated = (ctx, next) ->
  return await do next if ctx.method isnt "GET" or ctx.url isnt "/outdated"
  ctx.body = "You are using an outdated browser"

module.exports = {
  actionIndex
  actionOutdated
}
