{warn, err} = require '../logger'

errorHandler = (next) ->
  try
    yield next
  catch e
    {stack, status, properties} = e

    err stack

    status ?= 500
    @status = status
    @render "errors/http/#{status}", code: status, props: properties or null

module.exports = errorHandler
