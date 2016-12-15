{warn, err} = logger = require "../logger"

errorHandler = (ctx, next) ->
  try
    await do next
  catch error
    {stack, status, props} = error

    err stack

    ctx.status = status ? 500
    ctx.body = props

module.exports = errorHandler
