{normal} = require '../logger'
colors = require 'colors'

arrowRight = "->".grey
arrowLeft = "<-".grey

statusColor = (status) ->
  return "#{status}".green if 200 >= status < 300
  return "#{status}".grey if 300 >= status < 400

  # Maybe I don't need this code.
  return "#{status}".yellow if 400 >= status < 500
  return "#{status}".red if status >= 500

logger = (ctx, next) ->
  normal "#{arrowRight} #{ctx.method} #{decodeURI ctx.url}"
  await do next
  normal "
    #{arrowLeft} #{statusColor ctx.status} #{decodeURI ctx.url}
  "

module.exports = logger
