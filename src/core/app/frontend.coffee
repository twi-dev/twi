assets = require "../helper/util/assets"

# Serve index page
actionIndex = (ctx, next) ->
  await ctx.render "layout/root", getAssets: await do assets; return

module.exports = actionIndex
