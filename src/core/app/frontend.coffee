# Serve index page
actionIndex = (ctx, next) -> await ctx.render "layout/root"

module.exports = actionIndex
