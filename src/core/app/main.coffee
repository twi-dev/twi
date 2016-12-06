{realpath, readFile} = require "promise-fs"
{ok} = require "../logger"

getHostname = require "../helper/util/getHostname"

# Servers
servers =
  backend: require "./backend"
  static: require "./static"
  frontend: require "./frontend"

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

runApp = -> await runServer obj for name, obj of servers; return

module.exports = runApp
