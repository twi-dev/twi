{normal} = require '../logger'

logger = (next) ->
  normal "#{@method} #{@url}"
  yield next

module.exports = logger
