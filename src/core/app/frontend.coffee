# Serve index page
actionIndex = (ctx, next) ->
  await do next unless ctx.method is "GET" or ctx.url is "/"
  await ctx.render "layout/root"

actionOutdated = (ctx, next) ->
  await do next unless ctx.method is "GET" or ctx.url is "/outdated"
  ctx.body = "You are using an outdated browser"

module.exports = {
  actionIndex
  actionOutdated
}
