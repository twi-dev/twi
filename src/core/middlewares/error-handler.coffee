{warn, err} = require '../logger'

errorHandler = (next) ->
  try
    yield next
  catch e
    {stack, status, properties} = e

    err stack

    status ?= 500
    @status = status

    unless @isXhr
      @render "errors/http/#{status}", code: status, props: properties or null
    else
      @body = properties or {message: 'Something\'s broke'}

module.exports = errorHandler
