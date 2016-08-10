{warn, err} = require '../logger'

errorHandler = (ctx, next) ->
  try
    await do next
  catch e
    {stack, status, properties} = e

    err stack

    status ?= 500
    ctx.status = status

    unless ctx.isXhr
      ctx.render "errors/http/#{status}", code: status, props: properties or null
    else
      ctx.body = properties or {message: 'Something\'s broke'}

module.exports = errorHandler
