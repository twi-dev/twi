{realpath, readFile} = require "promise-fs"
{ok} = require "../logger"

getHostname = require "../helper/util/getHostname"

# Servers
servers =
  backend: require "./backend"
  static: require "./static"

###
# Get application server (http or http2)
###
getServer = (app, secure = false) ->
  unless secure
    {createServer} = require "http"
    return createServer do app.callback

  CERTS = await realpath "#{do process.cwd}/configs/cert"

  key = await readFile "#{CERTS}/twi.key"
  cert = await readFile "#{CERTS}/twi.crt"
  options = {key, cert}

  {createServer} = require "http2"

  return createServer options, do app.callback

###
# Run given server
#
# @param object
#
# @return Promise
###
runServer = ({app, host, port, secure, msg}) -> new Promise (resolve, reject) ->
  onFulfilled = ->
    ok "#{msg} #{getHostname host, port, secure}"; do resolve

  onRejected = (err) -> reject err

  try
    server = await getServer app
  catch err
    return onRejected err

  server
    .on "error", onRejected
    .listen port, onFulfilled

###
# Run all Twi servers :D
#
# @param boolean isDevel - if set as true,
#   run Twi app without static server
###
runApp = (isDevel = no) ->
  for name, obj of servers
    # skip static server when Twi running in development mode
    continue if isDevel and name is "static"

    await runServer obj

  return

module.exports = runApp
