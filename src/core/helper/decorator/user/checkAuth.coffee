ForbiddenException = require "../../../error/Forbidden"

checkAuth = (fn) -> _checkAuth = (ctx, next) ->
  unless do ctx.req.isAuthenticated
    throw new ForbiddenException "Unauthorized access to #{ctx.url}"

  await fn ctx, next

module.exports = checkAuth
