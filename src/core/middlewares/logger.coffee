{normal} = require '../logger'

logger = (next) ->
  normal "#{@method} -> #{@url}"
  yield next
  normal "#{@status} <- #{@url}"

module.exports = logger
