{warn, err} = require '../logger'

errorHandler = (next) ->
  try
    yield next
  catch e
    {stack, status, props} = e

    err stack

    status ?= 500
    props or= null
    @status = status
    @render "errors/#{status}", code: status, props: props

module.exports = errorHandler
