{normal} = require '../logger'

main = (next) ->
  normal "#{@method} #{@url}"
  yield next

module.exports = main
